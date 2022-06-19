import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

import {
	Send
} from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const getMuiTheme = () => createMuiTheme({
	overrides: {
		MuiTableCell: {
			head: {
				backgroundColor: "rgba(211, 211, 211, 0.5) !important",
				
			}
		}
	}
});
export default function EnvoiMailPromo(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.codeNiveau, item.libelleNiveau, item.idNiveau]
	});

	const [adresse, setAdresse] = useState([]);
	function envoiMail(id) {
		fetch("http://localhost:8080/getAdresseEmailByNiveau/" + id)
			.then(result => result.json())
			.then(
				(data) => {
					setAdresse(data.result);
				},
				(error) => {

				}
			)
	}

	var adresseEmail = "";
	if (adresse != "") {
		adresse.forEach(function(item, i) {
			adresseEmail += item + ";";
		});
		window.location.href = 'mailto:' + adresseEmail;
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" ? (
				<div>
					<PageTitle title="Liste des promos" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["CODE", "LIBELLE",
										{
											name: "ENVOI DE MAIL",
											options: {
												customBodyRender: (value, tableMeta, updateValue) => {
													return (
														<div>
															<button id='envoi' className='btn btn-danger' onClick={() => envoiMail(value)}>
																<Send />
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
							</MuiThemeProvider>
						</Grid>
					</Grid>
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}