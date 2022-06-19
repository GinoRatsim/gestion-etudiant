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
export default function Acces(props) {
	var datatableData = [];

	const [login, setLogin] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAcces")
			.then(res => res.json())
			.then(
				(data) => {
					setLogin(data.result);
				}
			)
	}, [])

	login.forEach(function(item, i) {
		datatableData[i] = [item.codeAcces, item.libelleAcces]
	});

	const libelleRef = useRef();
	const codeRef = useRef();
	const [libelle, setLibelle] = useState('');
	const [code, setCode] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addAcces',
				JSON.stringify(
					{
						"codeAcces": code,
						"libelleAcces": libelle
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
					<PageTitle title="Ajouter un type d'accès" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-4'>
								<label>Code</label>
								<input type='text' className='form-control' ref={codeRef} onChange={(e) => setCode(e.target.value)} value={code} required />
							</div>
							<div className='col-sm-4'>
								<label>Libellé</label>
								<input type='text' className='form-control' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des types d'accès des utilisateurs" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["CODE", "LIBELLE"]}
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