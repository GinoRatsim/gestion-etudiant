import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

export default function Module(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allModule")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.codeModule, item.libelleModule, item.estObligatoire === 1 ? 'Oui' : 'Non', item.creditRequis, item.niveau.libelleNiveau]
	});

	const libelleRef = useRef();
	const codeRef = useRef();
	const obligatoireRef = useRef();
	const creditRequisRef = useRef();
	const niveauRef = useRef();
	const [code, setCode] = useState('');
	const [libelle, setLibelle] = useState('');
	const [obligatoire, setObligatoire] = useState('');
	const [creditRequis, setCreditRequis] = useState('');
	const [niveau, setNiveau] = useState('');
	const [listeNiveau, setListeNiveau] = useState([]);
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addModule',
				JSON.stringify(
					{
						"idModule": 0,
						"codeModule": code,
						"libelleModule": libelle,
						"estObligatoire": obligatoire,
						"creditRequis": creditRequis,
						"niveau": {
							"idNiveau": niveau
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
					<PageTitle title="Ajouter un cours" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
								<label>Niveau</label>
								<select className='form-control' ref={niveauRef} onChange={(e) => setNiveau(e.target.value)} value={niveau}>
									<option>--</option>
									{listeNiveau.map(res => (
										<option key={res.idNiveau} value={res.idNiveau}>{res.codeNiveau} - {res.libelleNiveau}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Code</label>
								<input type="text" className='form-control' ref={codeRef} onChange={(e) => setCode(e.target.value)} value={code} required />
							</div>
							<div className='col-sm-2'>
								<label>Libellé</label>
								<input type="text" className='form-control' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
							</div>
							<div className='col-sm-2'>
								<label>Obligatoire</label>
								<select className='form-control' ref={obligatoireRef} onChange={(e) => setObligatoire(e.target.value)} value={obligatoire}>
									<option>--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Crédit requis</label>
								<input type="number" min="0" className='form-control' ref={creditRequisRef} onChange={(e) => setCreditRequis(e.target.value)} value={creditRequis} required />
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des cours" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["CODE", "LIBELLE", "OBLIGATOIRE", "CREDIT REQUIS", "NIVEAU"]}
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