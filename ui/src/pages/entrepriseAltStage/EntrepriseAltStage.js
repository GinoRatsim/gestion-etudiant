import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function EntrepriseAltStage(props) {

	Moment.locale('fr');

	var datatableData = [];
	
	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.entreprise.nomEntreprise, item.entreprise.secteurActiviteEntreprise, item.entreprise.responsableEntreprise, item.entreprise.telephoneEntreprise, item.entreprise.mailEntreprise, item.entreprise.adresseEntreprise, item.entreprise.codePostalEntreprise, item.entreprise.villeEntreprise]
	});

	return (
		<>
			{localStorage.getItem('id_token') === "P" ? (
				<div>
					<PageTitle title="Liste des entreprises accueillants les alternants/stagiaires" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["NOM", "SECTEUR D'ACTIVITE'", "RESPONSABLE", "TELEPHONE", "MAIL", "ADRESSE", "CODE POSTAL", "VILLE"]}
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