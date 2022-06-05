import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

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
		datatableData[i] = [item.aSoutenance ? 'Oui' : 'Non', item.estObligatoire ? 'Oui' : 'Non', item.estValide ? 'Validé' : 'Non validé', item.notesRapports, item.notesSoutenance, item.contrat.typeContrat.libelleTypeContrat, item.contrat.entreprise.nomEntreprise]
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
			axios.post(
				'http://localhost:8080/addCampus',
				JSON.stringify(
					{
						"idCampus": 0,
						"aSoutenance": aSoutenance,
						"estObligatoire": estObligatoire,
						"estValide": estValide,
						"notesSoutenance": notesSoutenance,
						"notesRapport": notesRapport,
						"": {
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

	return (
		<>
			{localStorage.getItem('id_token') === "DA" ? (
				<div>
					<PageTitle title="Ajouter une spécialité" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12'>
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
								<input type='text' className='form-control' ref={aSoutenanceRef} onChange={(e) => setaSoutenance(e.target.value)} value={aSoutenance} required />
							</div>
							<div className='col-sm-2'>
								<label>Obligatoire</label>
								<input type='text' className='form-control' ref={estObligatoireRef} onChange={(e) => setEstObligatoire(e.target.value)} value={estObligatoire} required />
							</div>
							<div className='col-sm-2'>
								<label>Validé</label>
								<input type='text' className='form-control' ref={estValideRef} onChange={(e) => setEstValide(e.target.value)} value={estValide} required />
							</div>
							<div className='col-sm-2'>
								<label>Note rapport</label>
								<input type='text' className='form-control' ref={notesRapportRef} onChange={(e) => setNotesRapport(e.target.value)} value={notesRapport} required />
							</div>
							<div className='col-sm-2'>
								<label>Note soutenance</label>
								<input type='text' className='form-control' ref={notesSoutenanceRef} onChange={(e) => setNotesSoutenance(e.target.value)} value={notesSoutenance} required />
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des mémoires de fin de cycle" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["SOUTENANCE", "OBLIGATOIRE", "STATUT", "NOTES RAPPORT", "NOTE SOUTENANCE", "CONTRAT", "ENTREPRISE"]}
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