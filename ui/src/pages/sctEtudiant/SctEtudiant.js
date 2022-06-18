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

import axios from 'axios';

export default function SctEtudiant(props) {
	var datatableData = [];

	const [listeSctEtudiant, setListeSctEtudiant] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allSctEtudiant")
			.then(res => res.json())
			.then(
				(data) => {
					setListeSctEtudiant(data.result);
				}
			)
	}, [])
	listeSctEtudiant.forEach(function(item, i) {
		datatableData[i] = [
			item.etudiant.personne.identifiant,
			item.etudiant.personne.prenoms + " " + item.etudiant.personne.nom,
			item.anneeScolaire.annee,
			item.valideCertification ? "Oui" : "Non",
			item.typeSct.libelleTypeSct,
			item.idSctEtudiant
		]
	});

	const [listeEtudiant, setListeEtudiant] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEtudiantActuel")
			.then(res => res.json())
			.then(
				(data) => {
					setListeEtudiant(data.result);
				}
			)
	}, [])

	const [listeAnneeScolaire, setListeAnneeScolaire] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAnneeScolaire")
			.then(res => res.json())
			.then(
				(data) => {
					setListeAnneeScolaire(data.result);
				}
			)
	}, [])

	const [listeTypeSct, setListeTypeSct] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypeSct")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypeSct(data.result);
				}
			)
	}, [])

	const etudiantRef = useRef();
	const typeSctRef = useRef();
	const anneeScolaireRef = useRef();
	const valideCertificationRef = useRef();

	const [etudiant, setEtudiant] = useState('');
	const [typeSct, setTypeSct] = useState('');
	const [anneeScolaire, setAnneeScolaire] = useState('');
	const [valideCertification, setValideCertification] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idSctEtudiant = document.getElementById('idSctEtudiant').value;
			if (idSctEtudiant > 0) {
				axios.post(
					'http://localhost:8080/addSctEtudiant',
					JSON.stringify(
						{
							"idSctEtudiant": idSctEtudiant,
							"valideCertification": valideCertification,
							"typeSct": {
								"idTypeSct": typeSct
							},
							"anneeScolaire": {
								"idAnneeScolaire": anneeScolaire
							},
							"etudiant": {
								"idEtudiant": etudiant
							},
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).then(res => {
					window.location.reload(false);
				})
			} else {
				axios.post(
					'http://localhost:8080/addSctEtudiant',
					JSON.stringify(
						{
							"valideCertification": valideCertification,
							"typeSct": {
								"idTypeSct": typeSct
							},
							"anneeScolaire": {
								"idAnneeScolaire": anneeScolaire
							},
							"etudiant": {
								"idEtudiant": etudiant
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
		document.getElementById('idSctEtudiant').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/oneSctEtudiant/" + id)
			.then(async response => {
				const data = await response.json();
				setEtudiant(data.result.etudiant.idEtudiant);
				setTypeSct(data.result.typeSct.idTypeSct);
				setAnneeScolaire(data.result.anneeScolaire.idAnneeScolaire);
				setValideCertification(data.result.valideCertification);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deleteSctEtudiant/" + id)
		window.location.reload(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" ? (
				<div>
					{localStorage.getItem('id_token') === "ADMIN" ? (
						<div>
							<PageTitle title="Ajouter un SCT étudiant" />
							<form onSubmit={add}>
								<div className='row ajout-type-acces'>
									<div className='col-sm-12'>
										<label>Etudiant</label>
										<select className='form-control' ref={etudiantRef} onChange={(e) => setEtudiant(e.target.value)} value={etudiant}>
											<option>--</option>
											{listeEtudiant.map(res => (
												<option key={res.idEtudiant} value={res.idEtudiant}>{res.personne.identifiant} - {res.personne.prenoms} {res.personne.nom} - {res.niveau.libelleNiveau} - {res.campus.libelleCampus} - {res.typeFormation.libelleTypeFormation}</option>
											))}
										</select>
									</div>
									<div className='col-sm-12'>&nbsp;</div>
									<div className='col-sm-4'>
										<label>Type SCT</label>
										<select className='form-control' ref={typeSctRef} onChange={(e) => setTypeSct(e.target.value)} value={typeSct}>
											<option>--</option>
											{listeTypeSct.map(res => (
												<option key={res.idTypeSct} value={res.idTypeSct}>{res.libelleTypeSct}</option>
											))}
										</select>
									</div>
									<div className='col-sm-4'>
										<label>Année scolaire</label>
										<select className='form-control' ref={anneeScolaireRef} onChange={(e) => setAnneeScolaire(e.target.value)} value={anneeScolaire}>
											<option>--</option>
											{listeAnneeScolaire.map(res => (
												<option key={res.idAnneeScolaire} value={res.idAnneeScolaire}>{res.annee}</option>
											))}
										</select>
									</div>
									<div className='col-sm-4'>
										<label>Certification validé</label>
										<select className='form-control' ref={valideCertificationRef} onChange={(e) => setValideCertification(e.target.value)} value={valideCertification}>
											<option value="">--</option>
											<option value="1">Oui</option>
											<option value="0">Non</option>
										</select>
									</div>
									<div className='col-sm-12'>&nbsp;</div>
									<div className='col-sm-10'>&nbsp;</div>
									<div className='col-sm-2'>
										<label>&nbsp;<input type="hidden" id="idSctEtudiant" className='form-control' disabled /></label>
										<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
									</div>
								</div>
							</form>
							<br />
							<PageTitle title="Liste des SCT étudiants" />
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<MUIDataTable
										data={datatableData}
										columns={["IDENTIFIANT", "ETUDIANT", "ANNEE SCOLAIRE", "CERTIFICATION VALIDE", "TYPE SCT",
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
						<div>
							<PageTitle title="Liste des SCT étudiants" />
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<MUIDataTable
										data={datatableData}
										columns={["IDENTIFIANT", "ETUDIANT", "ANNEE SCOLAIRE", "CERTIFICATION VALIDE", "TYPE SCT",
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
					)}
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}