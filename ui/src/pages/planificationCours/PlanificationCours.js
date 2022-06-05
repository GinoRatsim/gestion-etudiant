import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import Moment from 'moment';
import axios from 'axios';

export default function PlanificationCours(props) {
	Moment.locale('fr');
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allPlanificationCours")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	
	const [listeTypePlanification, setListeTypePlanification] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypePlanification")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypePlanification(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [
			Moment(item.dateHeureDebutPlanification).format('DD/MM/yyyy') + " - " + (Moment(item.dateHeureDebutPlanification).format('H') - 2) + ":" + (Moment(item.dateHeureDebutPlanification).format('mm')),  
			Moment(item.dateHeureFinPlanification).format('DD/MM/yyyy') + " - " + (Moment(item.dateHeureFinPlanification).format('H') - 2) + ":" + Moment(item.dateHeureFinPlanification).format('mm'), 
			item.estConfirme === 1 ? "OUI" : "NON", 
			item.module.codeModule + " / " + item.module.libelleModule, 
			item.typePlanification.libelleTypePlanification]
	});

	const [moduleListe, setModuleListe] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allModule")
			.then(res => res.json())
			.then(
				(data) => {
					setModuleListe(data.result);
				}
			)
	}, [])

	const dateHeureDebutPlanificationRef = useRef();
	const dateHeureFinPlanificationRef = useRef();
	const estConfirmeRef = useRef();
	const moduleModelRef = useRef();
	const typePlanificationRef = useRef();

	const [dateHeureDebutPlanification, setDateHeureDebutPlanification] = useState('');
	const [dateHeureFinPlanification, setDateHeureFinPlanification] = useState('');
	const [estConfirme, setEstConfirme] = useState('');
	const [moduleModel, setModuleModel] = useState('');
	const [typePlanification, setTypePlanification] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addPlanificationCours',
				JSON.stringify(
					{
						"idPlanification": 0,
						"dateHeureDebutPlanification": dateHeureDebutPlanification,
						"dateHeureFinPlanification": dateHeureFinPlanification,
						"estConfirme": estConfirme,
						"module": {
							"idModule": moduleModel
						},
						"typePlanification": {
							"idTypePlanification": typePlanification
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

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter une planification d'un cours" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
								<label>Date & Heure de début</label>
								<input type="datetime-local" className='form-control' ref={dateHeureDebutPlanificationRef} onChange={(e) => setDateHeureDebutPlanification(e.target.value)} value={dateHeureDebutPlanification} required />
							</div>
							<div className='col-sm-2'>
								<label>Date & Heure de fin</label>
								<input type="datetime-local" className='form-control' ref={dateHeureFinPlanificationRef} onChange={(e) => setDateHeureFinPlanification(e.target.value)} value={dateHeureFinPlanification} required />
							</div>
							<div className='col-sm-2'>
								<label>Confirmé</label>
								<select className='form-control' ref={estConfirmeRef} onChange={(e) => setEstConfirme(e.target.value)} value={estConfirme}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Module</label>
								<select className='form-control' ref={moduleModelRef} onChange={(e) => setModuleModel(e.target.value)} value={moduleModel}>
									<option>--</option>
									{moduleListe.map(res => (
										<option key={res.idModule} value={res.idModule}>{res.niveau.libelleNiveau} / {res.libelleModule}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Type de planification</label>
								<select className='form-control' ref={typePlanificationRef} onChange={(e) => setTypePlanification(e.target.value)} value={typePlanification}>
									<option>--</option>
									{listeTypePlanification.map(res => (
										<option key={res.idTypePlanification} value={res.idTypePlanification}>{res.libelleTypePlanification}</option>
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
					<PageTitle title="Liste des planification des cours" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["DATE & HEURE DEBUT", "DATE & HEURE FIN", "CONFIRME", "MODULE", "TYPE"]}
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