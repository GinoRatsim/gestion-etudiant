import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

import {
	RemoveRedEye,
	Edit,
	Delete
} from "@material-ui/icons";

export default function OffresPro(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allOffresPro")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.entreprise.nomEntreprise, item.typeContrat.libelleTypeContrat, item.libelleLong, item.fichierOffre, item.description, item.idOffresPro]
	});

	const entrepriseRef = useRef();
	const typeContratRef = useRef();
	const libelleRef = useRef();
	const fichierOffreRef = useRef();
	const descriptionRef = useRef();

	const [entreprise, setEntreprise] = useState('');
	const [typeContrat, setTypeContrat] = useState('');
	const [libelle, setLibelle] = useState('');
	const [fichierOffre, setFichierOffre] = useState('');
	const [description, setDescription] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idOffresPro = document.getElementById('idOffresPro').value;
			if (idOffresPro > 0) {
				axios.post(
					'http://localhost:8080/addOffresPro',
					JSON.stringify(
						{
							"idOffresPro" : idOffresPro,
							"description": description,
							"libelleLong": libelle,
							"fichierOffre": document.getElementById('fichierOffre').files[0].name,
							"entreprise": {
								"idEntreprise": entreprise
							},
							"typeContrat": {
								"idTypeContrat": typeContrat
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
				window.location.reload(false);
			}
			else{
				axios.post(
					'http://localhost:8080/addOffresPro',
					JSON.stringify(
						{
							"description": description,
							"libelleLong": libelle,
							"fichierOffre": document.getElementById('fichierOffre').files[0].name,
							"entreprise": {
								"idEntreprise": entreprise
							},
							"typeContrat": {
								"idTypeContrat": typeContrat
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

	const [listeEntreprise, setListeEntreprise] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEntreprise")
			.then(res => res.json())
			.then(
				(data) => {
					setListeEntreprise(data.result);
				}
			)
	}, [])

	const [listeTypeContrat, setListeTypeContrat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypeContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypeContrat(data.result);
				}
			)
	}, [])

	function voir(id) {

	}

	function modifier(id) {
		document.getElementById('idOffresPro').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/oneOffresPro/" + id)
			.then(async response => {
				const data = await response.json();
				setEntreprise(data.result.entreprise.idEntreprise);
				setTypeContrat(data.result.typeContrat.idTypeContrat);
				setLibelle(data.result.libelleLong);
				setDescription(data.result.description);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deleteOffresPro/" + id)
		window.location.reload(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" ? (
				<div>
					<PageTitle title="Ajouter une offre pro" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-6'>
								<label>Entreprise</label>
								<select className='form-control' ref={entrepriseRef} onChange={(e) => setEntreprise(e.target.value)} value={entreprise}>
									<option>--</option>
									{listeEntreprise.map(res => (
										<option key={res.idEntreprise} value={res.idEntreprise}>{res.nomEntreprise} - {res.adresseEntreprise}, {res.codePostalEntreprise} {res.villeEntreprise}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Type de contrat</label>
								<select className='form-control' ref={typeContratRef} onChange={(e) => setTypeContrat(e.target.value)} value={typeContrat}>
									<option>--</option>
									{listeTypeContrat.map(res => (
										<option key={res.idTypeContrat} value={res.idTypeContrat}>{res.libelleTypeContrat}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Libellé</label>
								<input type='text' className='form-control' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
							</div>
							<div className='col-sm-2'>
								<label>Offre</label>
								<input type="file" className='form-control' id="fichierOffre" ref={fichierOffreRef} onChange={(e) => setFichierOffre(e.target.value)} value={fichierOffre} required />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-10'>
								<label>Description</label>
								<textarea className='form-control' ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;<input type="hidden" id="idOffresPro" className='form-control' disabled /></label>
								<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des offres pro" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={[
									"ENTREPRISE", "TYPE DE CONTRAT", "LIBELLE", "OFFRE", "DESCRIPTION",
									{
										name: "",
										options: {
											customBodyRender: (value, tableMeta, updateValue) => {
												return (
													<div>
														<button className='btn btn-success' onClick={() => voir(value)} >
															<RemoveRedEye />
														</button>
														&nbsp;
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