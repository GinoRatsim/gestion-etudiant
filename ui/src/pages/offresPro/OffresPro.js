import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

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
		datatableData[i] = [item.entreprise.nomEntreprise, item.typeContrat.libelleTypeContrat, item.libelleLong, item.fichierOffre, item.description]
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
			axios.post(
				'http://localhost:8080/addOffresPro',
				JSON.stringify(
					{
						"description" : description,
						"libelleLong" : libelle,
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

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter une offre pro" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
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
							<div className='col-sm-4'></div>
							<div className='col-sm-10'>
								<label>Description</label>
								<textarea className='form-control' ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des offres pro" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["ENTREPRISE", "TYPE DE CONTRAT", "LIBELLE", "OFFRE", "DESCRIPTION"]}
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