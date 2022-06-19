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

import PageTitle from "../../components/PageTitle/PageTitle";
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
export default function GestionMemoire(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allMemoire")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.aSoutenance ? 'Oui' : 'Non', item.estObligatoire ? 'Oui' : 'Non', item.estValide ? 'Validé' : 'Non validé', item.notesRapports, item.notesSoutenance, item.contrat.typeContrat.libelleTypeContrat, item.contrat.entreprise.nomEntreprise, item.idMemoire]
	});

	const aSoutenanceRef = useRef();
	const estObligatoireRef = useRef();
	const estValideRef = useRef();
	const notesSoutenanceRef = useRef();
	const notesRapportRef = useRef();
	const contratRef = useRef();

	const [aSoutenance, setaSoutenance] = useState('');
	const [estObligatoire, setEstObligatoire] = useState('');
	const [estValide, setEstValide] = useState('');
	const [notesSoutenance, setNotesSoutenance] = useState('');
	const [notesRapport, setNotesRapport] = useState('');
	const [contrat, setContrat] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idMemoire = document.getElementById('idMemoire').value;
			if (idMemoire > 0) {
				axios.post(
					'http://localhost:8080/addMemoire',
					JSON.stringify(
						{
							"idMemoire": idMemoire,
							"aSoutenance": aSoutenance,
							"estObligatoire": estObligatoire,
							"estValide": estValide,
							"notesSoutenance": notesSoutenance,
							"notesRapports": notesRapport
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
					'http://localhost:8080/addMemoire',
					JSON.stringify(
						{
							"aSoutenance": aSoutenance,
							"estObligatoire": estObligatoire,
							"estValide": estValide,
							"notesSoutenance": notesSoutenance,
							"notesRapports": notesRapport,
							"contrat": {
								"idContrat": contrat
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
				window.location.reload(false);
			}
		}
		catch (err) {

		}
	}

	const [listeContrat, setListeContrat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/contratDispoMemoire")
			.then(res => res.json())
			.then(
				(data) => {
					setListeContrat(data.result);
				}
			)
	}, [])

	function modifier(id) {
		document.getElementById('idMemoire').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/oneMemoire/" + id)
			.then(async response => {
				const data = await response.json();
				setaSoutenance(data.result.aSoutenance);
				setEstObligatoire(data.result.estObligatoire);
				setEstValide(data.result.estValide);
				setNotesSoutenance(data.result.notesSoutenance);
				setNotesRapport(data.result.notesRapports);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deleteMemoire/" + id)
		window.location.reload(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA" ? (
				<div>
					<PageTitle title="Ajouter une mémoire de fin de cycle" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12' id='divContrat'>
								<label>Contrat</label>
								<select className='form-control' ref={contratRef} onChange={(e) => setContrat(e.target.value)} value={contrat}>
									<option>--</option>
									{listeContrat.map(res => (
										<option key={res.idContrat} value={res.idContrat}>
											{Moment(res.date_debut_contrat).format('DD/MM/yyyy')} - {Moment(res.date_fin_contrat).format('DD/MM/yyyy')} - {res.entreprise.nomEntreprise} - {res.typeContrat.libelleTypeContrat}
										</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Soutenance</label>
								<select className='form-control' ref={aSoutenanceRef} onChange={(e) => setaSoutenance(e.target.value)} value={aSoutenance}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Obligatoire</label>
								<select className='form-control' ref={estObligatoireRef} onChange={(e) => setEstObligatoire(e.target.value)} value={estObligatoire}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Validé</label>
								<select className='form-control' ref={estValideRef} onChange={(e) => setEstValide(e.target.value)} value={estValide} >
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Note rapport</label>
								<input type='number' min='0' className='form-control' ref={notesRapportRef} onChange={(e) => setNotesRapport(e.target.value)} value={notesRapport} required />
							</div>
							<div className='col-sm-2'>
								<label>Note soutenance</label>
								<input type='number' min='0' className='form-control' ref={notesSoutenanceRef} onChange={(e) => setNotesSoutenance(e.target.value)} value={notesSoutenance} required />
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;<input type="hidden" id="idMemoire" className='form-control' disabled /></label>
								<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des mémoires de fin de cycle" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={[
										"SOUTENANCE", "OBLIGATOIRE", "STATUT", "NOTES RAPPORT", "NOTE SOUTENANCE", "CONTRAT", "ENTREPRISE",
										{
											name: "MEMOIRE",
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
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}