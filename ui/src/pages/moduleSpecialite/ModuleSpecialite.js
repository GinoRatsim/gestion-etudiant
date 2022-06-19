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
export default function ModuleSpecialite(props) {
	var datatableData = [];

	const [login, setLogin] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allModuleSpecialite")
			.then(res => res.json())
			.then(
				(data) => {
					setLogin(data.result);
				}
			)
	}, [])

	login.forEach(function(item, i) {
		datatableData[i] = [item.module.libelleModule, item.specialite.libelleSpecialite]
	});

	const modRef = useRef();
	const specRef = useRef();

	const [mod, setMod] = useState('');
	const [spec, setSpec] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addModuleSpecialite',
				JSON.stringify(
					{
						"specialite": {
							"idSpecialite": spec,
						},
						"module": {
							"idModule": mod,
						},
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

	const [listeModule, setListeModule] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allModule")
			.then(res => res.json())
			.then(
				(data) => {
					setListeModule(data.result);
				}
			)
	}, [])

	const [listeSpecialite, setListeSpecialite] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allSpecialite")
			.then(res => res.json())
			.then(
				(data) => {
					setListeSpecialite(data.result);
				}
			)
	}, [])

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter module et spécialité" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-4'>
								<label>Module</label>
								<select className='form-control' ref={modRef} onChange={(e) => setMod(e.target.value)} value={mod}>
									<option>--</option>
									{listeModule.map(res => (
										<option key={res.idModule} value={res.idModule}>{res.niveau.codeNiveau} - {res.libelleModule}</option>
									))}
								</select>
							</div>
							<div className='col-sm-4'>
								<label>Spécialité</label>
								<select className='form-control' ref={specRef} onChange={(e) => setSpec(e.target.value)} value={spec}>
									<option>--</option>
									{listeSpecialite.map(res => (
										<option key={res.idSpecialite} value={res.idSpecialite}>{res.libelleSpecialite}</option>
									))}
								</select>
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des modules et spécialités" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["MODULE", "SPECIALITE"]}
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