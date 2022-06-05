import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function ListeCoursIntervenants(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allIntervenantModule")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
					console.log(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.module.niveau.libelleNiveau, item.module.libelleModule, item.campus.libelleCampus, item.personneIntervenant.personne.prenoms+" "+item.personneIntervenant.personne.nom, item.personneIntervenant.intervenant.libelleIntervenant]
	});

	return (
		<>
			{localStorage.getItem('id_token') === "DA" ? (
				<div>
					<PageTitle title="Liste des cours et intervenants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={[
									"NIVEAU", "COURS", "CAMPUS", "PROFESSEUR", "INTERVENANT"
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