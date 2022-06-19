import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';
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
export default function Groupe(props) {
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allGroupe")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [item.nomGroupe]
	});

	const nomRef = useRef();
	const [nom, setNom] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addGroupe',
				JSON.stringify(
					{
						"nomGroupe": nom
					}
				),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			).then(res => {
				window.location.reload(false);
			})
		}
		catch (err) {

		}
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un groupe" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-8'>
								<label>Nom</label>
								<input type='text' className='form-control' ref={nomRef} onChange={(e) => setNom(e.target.value)} value={nom} required />
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des groupes" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["NOM"]}
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