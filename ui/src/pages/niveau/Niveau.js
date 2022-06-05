import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
import axios from 'axios';

export default function Niveau(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.codeNiveau, item.libelleNiveau]
	});

	const libelleRef = useRef();
	const codeRef = useRef();
	const [libelle, setLibelle] = useState('');
	const [code, setCode] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addNiveau',
				JSON.stringify(
					{
						"idAcces": 0,
						"codeNiveau": code,
						"libelleNiveau": libelle
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
					<PageTitle title="Ajouter un niveau" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-4'>
								<label>Code</label>
								<input type='text' className='form-control' ref={codeRef} onChange={(e) => setCode(e.target.value)} value={code} required />
							</div>
							<div className='col-sm-4'>
								<label>Libellé</label>
								<input type='text' className='form-control' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des niveaux" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["CODE", "LIBELLE"]}
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