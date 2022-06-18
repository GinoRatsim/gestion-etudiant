import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';

export default function GroupeModule(props) {
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allGroupeModule")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [item.groupe.nomGroupe, item.campus.libelleCampus, item.module.libelleModule, item.module.niveau.libelleNiveau, item.etudiant.personne.prenoms + " " + item.etudiant.personne.nom]
	});

	const campusRef = useRef();
	const etudiantRef = useRef();
	const groupeRef = useRef();
	const moduleARef = useRef();

	const [campus, setCampus] = useState('');
	const [etudiant, setEtudiant] = useState('');
	const [groupe, setGroupe] = useState('');
	const [moduleA, setModuleA] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addGroupeModule',
				JSON.stringify(
					{
						"campus": {
							"idCampus": campus
						},
						"etudiant": {
							"idEtudiant": etudiant
						},
						"groupe": {
							"idGroupe": groupe
						},
						"module": {
							"idModule": moduleA
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
		catch (err) {

		}
	}

	const [listeCampus, setListeCampus] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allCampus")
			.then(res => res.json())
			.then(
				(data) => {
					setListeCampus(data.result);
				}
			)
	}, [])

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

	const [listeGroupe, setListeGroupe] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allGroupe")
			.then(res => res.json())
			.then(
				(data) => {
					setListeGroupe(data.result);
				}
			)
	}, [])

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

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter groupe & module" />
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
								<label>Module</label>
								<select className='form-control' ref={moduleARef} onChange={(e) => setModuleA(e.target.value)} value={moduleA}>
									<option>--</option>
									{listeModule.map(res => (
										<option key={res.idModule} value={res.idModule}>{res.libelleModule}</option>
									))}
								</select>
							</div>
							<div className='col-sm-4'>
								<label>Campus</label>
								<select className='form-control' ref={campusRef} onChange={(e) => setCampus(e.target.value)} value={campus}>
									<option>--</option>
									{listeCampus.map(res => (
										<option key={res.idCampus} value={res.idCampus}>{res.libelleCampus}</option>
									))}
								</select>
							</div>
							<div className='col-sm-4'>
								<label>Groupe</label>
								<select className='form-control' ref={groupeRef} onChange={(e) => setGroupe(e.target.value)} value={groupe}>
									<option>--</option>
									{listeGroupe.map(res => (
										<option key={res.idGroupe} value={res.idGroupe}>{res.nomGroupe}</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-10'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des groupes & modules" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["NOM GROUPE", "CAMPUS", "MODULE", "NIVEAU", "ETUDIANT"]}
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