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

export default function SuiviComptable(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [listeEtudiantActuel, setListeEtudiantActuel] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEtudiantActuel")
			.then(res => res.json())
			.then(
				(data) => {
					setListeEtudiantActuel(data.result);
				}
			)
	}, [])

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allComptabilite")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		console.log(item)
		datatableData[i] = [
			item.etudiant.personne.identifiant,
			item.etudiant.personne.nom,
			item.etudiant.personne.prenoms,
			item.comptaPaieType,
			item.comptaPayementDue,
			item.comptaRelance ? "Oui" : "Non",
			item.estTotalementPayer ? "Oui" : "Non",
			item.idComptabilite
		]
	});

	const comptaPaieTypeRef = useRef();
	const comptaPayementDueRef = useRef();
	const comptaRelanceRef = useRef();
	const estTotalementPayerRef = useRef();
	const etudiantRef = useRef();

	const [comptaPaieType, setComptaPaieType] = useState('');
	const [comptaPayementDue, setComptaPayementDue] = useState('');
	const [comptaRelance, setComptaRelance] = useState('');
	const [estTotalementPayer, setEstTotalementPayer] = useState('');
	const [etudiant, setEtudiant] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idComptabilite = document.getElementById('idComptabilite').value;
			if (idComptabilite > 0) {
				axios.post(
					'http://localhost:8080/addComptabilite',
					JSON.stringify(
						{
							"idComptabilite": idComptabilite,
							"comptaPaieType": comptaPaieType,
							"comptaPayementDue": comptaPayementDue,
							"comptaRelance": comptaRelance,
							"estTotalementPayer": estTotalementPayer,
							"etudiant": {
								idEtudiant: etudiant
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
			else {
				axios.post(
					'http://localhost:8080/addComptabilite',
					JSON.stringify(
						{
							"comptaPaieType": comptaPaieType,
							"comptaPayementDue": comptaPayementDue,
							"comptaRelance": comptaRelance,
							"estTotalementPayer": estTotalementPayer,
							"etudiant": {
								idEtudiant: etudiant
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
		}
		catch (err) {

		}
	}

	function modifier(id) {
		document.getElementById('idComptabilite').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/oneComptabilite/" + id)
			.then(async response => {
				const data = await response.json();
				setComptaPaieType(data.result.comptaPaieType);
				setComptaPayementDue(data.result.comptaPayementDue);
				setComptaRelance(data.result.comptaRelance);
				setEstTotalementPayer(data.result.estTotalementPayer);
				setEtudiant(data.result.etudiant.idEtudiant);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deleteComptabilite/" + id)
		window.location.reload(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "ADM" ? (
				<div>
					<PageTitle title="Ajouter un suivi comptable" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12'>
								<label>Etudiant</label>
								<select className='form-control' ref={etudiantRef} onChange={(e) => setEtudiant(e.target.value)} value={etudiant}>
									<option>--</option>
									{listeEtudiantActuel.map(res => (
										<option key={res.idEtudiant} value={res.idEtudiant}>{res.personne.identifiant} - {res.personne.prenoms} {res.personne.nom} - {res.niveau.libelleNiveau} - {res.campus.libelleCampus} - {res.typeFormation.libelleTypeFormation}</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>
								&nbsp;
							</div>
							<div className='col-sm-2'>
								<label>Type de paie</label>
								<input type='text' className='form-control' ref={comptaPaieTypeRef} onChange={(e) => setComptaPaieType(e.target.value)} value={comptaPaieType} required />
							</div>
							<div className='col-sm-2'>
								<label>Paiement due</label>
								<input type='number' min='0' className='form-control' ref={comptaPayementDueRef} onChange={(e) => setComptaPayementDue(e.target.value)} value={comptaPayementDue} required />
							</div>
							<div className='col-sm-2'>
								<label>Relance</label>
								<select className='form-control' ref={comptaRelanceRef} onChange={(e) => setComptaRelance(e.target.value)} value={comptaRelance}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Totalement payer</label>
								<select className='form-control' ref={estTotalementPayerRef} onChange={(e) => setEstTotalementPayer(e.target.value)} value={estTotalementPayer}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								&nbsp;
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;<input type="hidden" id="idComptabilite" className='form-control' disabled /></label>
								<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Suivi comptable" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["IDENTIFIANT", "NOM", "PRENOM", "TYPE", "DUE", "RELANCE", "TOTALEMENT PAYE",
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
						</Grid>
					</Grid>
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}