import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

export default function SuiviAnciens(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAnciens")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [
			Moment(item.dateDebut).format('DD/MM/yyyy'),
			Moment(item.dateObtentionDiplome).format('DD/MM/yyyy'),
			item.entreprise.nomEntreprise,
			item.etudiant.personne.prenoms + " " + item.etudiant.personne.nom,
			item.typeContrat.libelleTypeContrat
		]
	});

	const dateDebutRef = useRef();
	const dateObtentionDiplomeRef = useRef();
	const entrepriseRef = useRef();
	const etudiantRef = useRef();
	const typeContratRef = useRef();

	const [dateDebut, setDateDebut] = useState('');
	const [dateObtentionDiplome, setDateObtentionDiplome] = useState('');
	const [entreprise, setEntreprise] = useState('');
	const [etudiant, setEtudiant] = useState('');
	const [typeContrat, setTypeContrat] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addAnciens',
				JSON.stringify(
					{
						"dateDebut": dateDebut,
						"dateObtentionDiplome": dateObtentionDiplome,
						"entreprise": {
							"idEntreprise": entreprise
						},
						"etudiant": {
							"idEtudiant": etudiant
						},
						"typeContrat": {
							"idTypeContrat": typeContrat
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
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA" ? (
				<div>
					<PageTitle title="Ajouter un ancien" />
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
							<div className='col-sm-12'>
								&nbsp;
							</div>
							<div className='col-sm-2'>
								<label>Date de début</label>
								<input type='date' className='form-control' ref={dateDebutRef} onChange={(e) => setDateDebut(e.target.value)} value={dateDebut} required />
							</div>
							<div className='col-sm-2'>
								<label>Date d'obtention' du diplôme</label>
								<input type='date' className='form-control' ref={dateObtentionDiplomeRef} onChange={(e) => setDateObtentionDiplome(e.target.value)} value={dateObtentionDiplome} required />
							</div>
							<div className='col-sm-2'>
								<label>Entreprise</label>
								<select className='form-control' ref={entrepriseRef} onChange={(e) => setEntreprise(e.target.value)} value={entreprise}>
									<option>--</option>
									{listeEntreprise.map(res => (
										<option key={res.idEntreprise} value={res.idEntreprise}>{res.nomEntreprise}</option>
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
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Anciens étudiants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["DEBUT DU CARRIERE", "OBTENTION DU DIPLOME", "ENTREPRISE", "ETUDIANT", "TYPE DU CONTRAT"]}
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