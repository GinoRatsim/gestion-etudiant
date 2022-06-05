import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

export default function Etudiant(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEtudiant")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.personne.identifiant, item.personne.nom, item.personne.prenoms, Moment(item.debutAnneeScolaire).format('DD/MM/yyyy') + " - " + Moment(item.finAnneeScolaire).format('DD/MM/yyyy'), item.niveau.libelleNiveau, item.typeFormation.libelleTypeFormation, item.contrat.typeContrat.libelleTypeContrat, item.specialite.libelleSpecialite, item.creditTotalObtenus]
	});

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/allEtudiant',
				JSON.stringify(
					{


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

	const [listeTypeFormation, setListeTypeFormation] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypeFormation")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypeFormation(data.result);
				}
			)
	}, [])

	const [listeNiveau, setListeNiveau] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setListeNiveau(data.result);
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


	const [listeContrat, setListeContrat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setListeContrat(data.result);
				}
			)
	}, [])

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un étudiant" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12'><b>PERSONNEL</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Nom</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Nom d'usage</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Prénom</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Sexe</label>
								<select className='form-control'>
									<option>--</option>
									<option value="M">Masculin</option>
									<option value="F">Féminin</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Date de naissance</label>
								<input type="date" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Identifiant</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-12'><b>ADRESSE</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Actuel</label>
								<input type="number" min='0' className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Email personnel</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Email Supinfo</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone personnel</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone Supinfo</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Adresse</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Code postal</label>
								<input type="number" min='0' className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Ville</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Région</label>
								<input type="text" className='form-control' />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-12'><b>SCOLAIRE</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Actuel</label>
								<input type="number" min="0" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Crédit total obtenus</label>
								<input type="number" min="0" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Début de l'année scolaire</label>
								<input type="date" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Fin de l'année scolaire</label>
								<input type="date" className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Contrat</label>
								<select className='form-control'>
									<option>--</option>
									{listeContrat.map(res => (
										<option key={res.idContrat} value={res.idContrat}>{res.typeContrat.libelleTypeContrat} / {res.entreprise.nomEntreprise} / {res.dateDebutContrat} - {res.dataFinContrat} / {res.dureeContrat}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Niveau</label>
								<select className='form-control'>
									<option>--</option>
									{listeNiveau.map(res => (
										<option key={res.idNiveau} value={res.idNiveau}>{res.libelleNiveau}</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Spécialité</label>
								<select className='form-control'>
									<option>--</option>
									{listeSpecialite.map(res => (
										<option key={res.idSpecialite} value={res.idSpecialite}>{res.libelleSpecialite}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Type de formation</label>
								<select className='form-control'>
									<option>--</option>
									{listeTypeFormation.map(res => (
										<option key={res.idTypeFormation} value={res.idTypeFormation}>{res.libelleTypeFormation}</option>
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
					<PageTitle title="Liste des étudiants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["IDENTIFIANT", "NOM", "PRENOM", "ANNEE SCOLAIRE", "NIVEAU", "FORMATION", "CONTRAT", "SPECIALITE", "CREDIT OBTENUS"]}
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