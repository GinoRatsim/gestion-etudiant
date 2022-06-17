import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

export default function SuiviComptable(props) {

	Moment.locale('fr');

	var datatableData = [];

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
		datatableData[i] = [
			item.personne.identifiant,
			item.personne.nom,
			item.personne.prenom,
			item.comptaPayeType,
			item.comptaPayementDue,
			item.comptaRelance,
			item.estTotalementPayer
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
			axios.post(
				'http://localhost:8080/addCampus',
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
		catch (err) {

		}
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
								<input type='text' className='form-control' />
							</div>
							<div className='col-sm-12'>
								&nbsp;
							</div>
							<div className='col-sm-2'>
								<label>Type de paie</label>
								<input type='text' className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Paiement due</label>
								<input type='text' className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Relance</label>
								<input type='text' className='form-control' />
							</div>
							<div className='col-sm-2'>
								<label>Totalement payer</label>
								<input type='text' className='form-control' />
							</div>
							<div className='col-sm-2'>
								&nbsp;
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Suivi comptable" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["IDENTIFIANT", "NOM", "PRENOM", "TYPE", "DUE", "RELANCE", "TOTALEMENT PAYE"]}
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