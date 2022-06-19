import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import {
	Edit,
	Delete
} from "@material-ui/icons";

import PageTitle from "../../components/PageTitle";

import Moment from 'moment';
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
export default function PlanificationCours(props) {
	Moment.locale('fr');
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	const [listeTypePlanification, setListeTypePlanification] = useState([]);
	const [moduleListe, setModuleListe] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/allPlanificationCours")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)

		fetch("http://localhost:8080/allTypePlanification")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypePlanification(data.result);
				}
			)
	}, [])



	donnee.forEach(function(item, i) {
		datatableData[i] = [
			Moment(item.dateHeureDebutPlanification).format('DD/MM/yyyy') + " - " + (Moment(item.dateHeureDebutPlanification).format('H')) + ":" + (Moment(item.dateHeureDebutPlanification).format('mm')),
			Moment(item.dateHeureFinPlanification).format('DD/MM/yyyy') + " - " + (Moment(item.dateHeureFinPlanification).format('H')) + ":" + Moment(item.dateHeureFinPlanification).format('mm'),
			item.estConfirme === 1 ? "OUI" : "NON",
			item.module.codeModule + " / " + item.module.libelleModule,
			item.typePlanification.libelleTypePlanification,
			item.idPlanification
		]
	});

	useEffect(() => {
		fetch("http://localhost:8080/allModule")
			.then(res => res.json())
			.then(
				(data) => {
					setModuleListe(data.result);
				}
			)
	}, [])

	const dateHeureDebutPlanificationRef = useRef();
	const dateHeureFinPlanificationRef = useRef();
	const estConfirmeRef = useRef();
	const moduleModelRef = useRef();
	const typePlanificationRef = useRef();

	const [dateHeureDebutPlanification, setDateHeureDebutPlanification] = useState('');
	const [dateHeureFinPlanification, setDateHeureFinPlanification] = useState('');
	const [estConfirme, setEstConfirme] = useState('');
	const [moduleModel, setModuleModel] = useState('');
	const [typePlanification, setTypePlanification] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			var idPlanification = document.getElementById('idPlanification').value;
			if (idPlanification > 0) {
				axios.post(
					'http://localhost:8080/addPlanificationCours',
					JSON.stringify(
						{
							"idPlanification": idPlanification,
							"dateHeureDebutPlanification": dateHeureDebutPlanification,
							"dateHeureFinPlanification": dateHeureFinPlanification,
							"estConfirme": estConfirme,
							"module": {
								"idModule": moduleModel
							},
							"typePlanification": {
								"idTypePlanification": typePlanification
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).then(res => {
					window.location.reload(false);
				})
			}
			else {
				axios.post(
					'http://localhost:8080/addPlanificationCours',
					JSON.stringify(
						{
							"dateHeureDebutPlanification": dateHeureDebutPlanification,
							"dateHeureFinPlanification": dateHeureFinPlanification,
							"estConfirme": estConfirme,
							"module": {
								"idModule": moduleModel
							},
							"typePlanification": {
								"idTypePlanification": typePlanification
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).then(res => {
					window.location.reload(false);
				})
			}
		}
		catch (err) {

		}
	}

	function modifier(id) {
		document.getElementById('idPlanification').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/onePlanificationCours/" + id)
			.then(async response => {
				const data = await response.json();
				setDateHeureDebutPlanification(Moment(data.result.dateHeureDebutPlanification).format('yyyy-MM-DDTHH:mm'));
				setDateHeureFinPlanification(Moment(data.result.dateHeureFinPlanification).format('yyyy-MM-DDTHH:mm'));
				setEstConfirme(data.result.estConfirme);
				setModuleModel(data.result.module.idModule);
				setTypePlanification(data.result.typePlanification.idTypePlanification);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deletePlanificationCours/" + id)
		window.location.reload(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" || localStorage.getItem('id_token') === "E" ? (
				<div>
					{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" ? (
						<div>
							<PageTitle title="Planifier" />
							<form onSubmit={add}>
								<div className='row ajout-type-acces'>
									<div className='col-sm-2'>
										<label>Date & Heure de début</label>
										<input type="datetime-local" className='form-control' ref={dateHeureDebutPlanificationRef} onChange={(e) => setDateHeureDebutPlanification(e.target.value)} value={dateHeureDebutPlanification} required />
									</div>
									<div className='col-sm-2'>
										<label>Date & Heure de fin</label>
										<input type="datetime-local" className='form-control' ref={dateHeureFinPlanificationRef} onChange={(e) => setDateHeureFinPlanification(e.target.value)} value={dateHeureFinPlanification} required />
									</div>
									<div className='col-sm-2'>
										<label>Confirmé</label>
										<select className='form-control' ref={estConfirmeRef} onChange={(e) => setEstConfirme(e.target.value)} value={estConfirme}>
											<option value="">--</option>
											<option value="1">Oui</option>
											<option value="0">Non</option>
										</select>
									</div>
									<div className='col-sm-2'>
										<label>Module</label>
										<select className='form-control' ref={moduleModelRef} onChange={(e) => setModuleModel(e.target.value)} value={moduleModel}>
											<option>--</option>
											{moduleListe.map(res => (
												<option key={res.idModule} value={res.idModule}>{res.niveau.libelleNiveau} / {res.libelleModule}</option>
											))}
										</select>
									</div>
									<div className='col-sm-2'>
										<label>Type de planification</label>
										<select className='form-control' ref={typePlanificationRef} onChange={(e) => setTypePlanification(e.target.value)} value={typePlanification}>
											<option>--</option>
											{listeTypePlanification.map(res => (
												<option key={res.idTypePlanification} value={res.idTypePlanification}>{res.libelleTypePlanification}</option>
											))}
										</select>
									</div>
									<div className='col-sm-2'>
										<label>&nbsp;<input type="hidden" id="idPlanification" className='form-control' disabled /></label>
										<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
									</div>
								</div>
							</form>
							<br />

							<PageTitle title="Liste des planing" />
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<MuiThemeProvider theme={getMuiTheme()}>
										<MUIDataTable
											data={datatableData}
											columns={[
												"DATE & HEURE DEBUT", "DATE & HEURE FIN", "CONFIRME", "MODULE", "TYPE",
												{
													name: "",
													options: {
														customBodyRender: (value, tableMeta, updateValue) => {
															return (
																<div>
																	<button className='btn btn-warning' onClick={() => modifier(value)}>
																		<Edit />
																	</button>
																	&nbsp;
																	<button className='btn btn-danger' onClick={() => supprimer(value)}>
																		<Delete />
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
						<div>
							<PageTitle title="Liste des planing" />
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<MuiThemeProvider theme={getMuiTheme()}>
										<MUIDataTable
											data={datatableData}
											columns={["DATE & HEURE DEBUT", "DATE & HEURE FIN", "CONFIRME", "MODULE", "TYPE"]}
											options={{
												selectableRows: 'none'
											}}
										/>
									</MuiThemeProvider>
								</Grid>
							</Grid>
						</div>
					)}
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}