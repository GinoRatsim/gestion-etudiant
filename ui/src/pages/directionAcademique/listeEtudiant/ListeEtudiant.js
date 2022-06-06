import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import {
	RemoveRedEye
} from "@material-ui/icons";

import PageTitle from "../../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function ListeEtudiant(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEtudiant")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.personne.identifiant, item.personne.nom, item.personne.prenoms, item.specialite.libelleSpecialite, item.typeFormation.libelleTypeFormation, item.contrat.typeContrat.libelleTypeContrat, item.niveau.libelleNiveau, item.idEtudiant]
	});

	function voirDetail(history, idEtudiant) {
		history.push("/app/ficheEtudiant/" + idEtudiant);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "DA" || localStorage.getItem('id_token') === "P" ? (
				<div>
					<PageTitle title="Liste des étudiants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={[
									"IDENTIFIANT", "NOM", "PRENOM", "SPECIALITE", "TYPE DE FORMATION", "TYPE DE CONTRAT", "NIVEAU ACTUEL",
									{
										name: "",
										options: {
											customBodyRender: (value, tableMeta, updateValue) => {
												return (
													<div>
														<button className='btn btn-success' onClick={() => voirDetail(props.history, value)}>
															<RemoveRedEye />
														</button>
													</div>
												);
											}
										}
									}
								]}
								options={{
									selectableRows: 'none'
								}}
							/>
						</Grid>
					</Grid>
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}