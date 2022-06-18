import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';
import Moment from 'moment';

export default function AdministratifEtudiant(props) {
	var datatableData = [];
	Moment.locale('fr');
	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAdministratifEtudiant")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [Moment(item.anneeEntree).format('DD/MM/yyyy'), Moment(item.anneeSortie).format('DD/MM/yyyy'), item.niveauEntree, item.niveauSortie, item.personne.prenoms + " " + item.personne.nom]
	});

	const anneeEntreeRef = useRef();
	const anneeSortieRef = useRef();
	const niveauEntreeRef = useRef();
	const niveauSortieRef = useRef();
	const personneRef = useRef();

	const [anneeEntree, setAnneeEntree] = useState('');
	const [anneeSortie, setAnneeSortie] = useState('');
	const [niveauEntree, setNiveauEntree] = useState('');
	const [niveauSortie, setNiveauSortie] = useState('');
	const [personne, setPersonne] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addAdministratifEtudiant',
				JSON.stringify(
					{
						"anneeEntree": anneeEntree,
						"anneeSortie": anneeSortie,
						"niveauEntree": niveauEntree,
						"niveauSortie": niveauSortie,
						"personne": {
							"idPersonne": personne
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

	const [listeNiveau, setListeNiveau] = useState([])
	useEffect(() => {
		fetch("http://localhost:8080/allNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setListeNiveau(data.result);
				}
			)
	}, [])

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un type d'accès" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12'>
								<label>Etudiant</label>
								<select className='form-control' ref={personneRef} onChange={(e) => setPersonne(e.target.value)} value={personne}>
									<option>--</option>
									{listeEtudiant.map(res => (
										<option key={res.personne.idPersonne} value={res.personne.idPersonne}>{res.personne.identifiant} - {res.personne.prenoms} {res.personne.nom} - {res.niveau.libelleNiveau} - {res.campus.libelleCampus} - {res.typeFormation.libelleTypeFormation}</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Année d'entrée</label>
								<input type='date' className='form-control' ref={anneeEntreeRef} onChange={(e) => setAnneeEntree(e.target.value)} value={anneeEntree} required />
							</div>
							<div className='col-sm-2'>
								<label>Année de sortie</label>
								<input type='date' className='form-control' ref={anneeSortieRef} onChange={(e) => setAnneeSortie(e.target.value)} value={anneeSortie} required />
							</div>
							<div className='col-sm-2'>
								<label>Niveau d'entrée</label>
								<select className='form-control' ref={niveauEntreeRef} onChange={(e) => setNiveauEntree(e.target.value)} value={niveauEntree}>
									<option>--</option>
									{listeNiveau.map(res => (
										<option key={res.idNiveau} value={res.idNiveau}>{res.libelleNiveau}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Niveau de sortie</label>
								<select className='form-control' ref={niveauSortieRef} onChange={(e) => setNiveauSortie(e.target.value)} value={niveauSortie}>
									<option>--</option>
									{listeNiveau.map(res => (
										<option key={res.idNiveau} value={res.idNiveau}>{res.libelleNiveau}</option>
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
					<PageTitle title="Liste des types d'accès des utilisateurs" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["ANNEE ENTREE", "ANNEE SORTIE", "NIVEAU ENTREE", "NIVEAU SORTIE"]}
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