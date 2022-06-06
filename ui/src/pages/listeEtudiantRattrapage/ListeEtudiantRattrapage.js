import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import {
	RemoveRedEye
} from "@material-ui/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function ListeEtudiantRattrapage(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNotesRattrapage")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [
			item.etudiant.personne.identifiant,
			item.etudiant.personne.nom,
			item.etudiant.personne.prenoms,
			item.module.libelleModule,
			item.notes,
			item.etudiant.contrat.typeContrat.libelleTypeContrat,
			item.etudiant.idEtudiant
		];
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
									"IDENTIFIANT", "NOM", "PRENOM", "MODULE", "NOTES", "STATUT",
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