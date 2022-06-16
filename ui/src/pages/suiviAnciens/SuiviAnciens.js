import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function SuiviAnciens(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAnciens")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
					console.log(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [
			Moment(item.dateDebut).format('DD/MM/yyyy'),
			Moment(item.dateObtentionDiplome).format('DD/MM/yyyy'), 
			item.entreprise.nomEntreprise,
			item.etudiant.personne.prenoms + " " + item.etudiant.personne.nom,
			item.typeContrat.libelleTypeContrat
		]
	});

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA" ? (
				<div>
					<PageTitle title="Anciens étudiants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["DEBUT DU CARRIERE", "OBTENTION DU DIPLOME", "ENTREPRISE", "ETUDIANT", "TYPE DU CONTRAT"]}
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