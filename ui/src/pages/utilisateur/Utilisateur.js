import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";
import axios from 'axios';

export default function Utilisateur(props) {
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allLogin")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [item.user, item.accesModel.libelleAcces]
	});

	const userRef = useRef();
	const passRef = useRef();
	const accesRef = useRef();
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	const [acces, setAcces] = useState('');
	const [listeAcces, setListeAcces] = useState([]);

	//PERSONNE
	const nomRef = useRef();
	const nomUsageRef = useRef();
	const prenomsRef = useRef();
	const sexeRef = useRef();
	const dateNaissanceRef = useRef();
	const identifiantRef = useRef();

	const [nom, setNom] = useState('');
	const [nomUsage, setNomUsage] = useState('');
	const [prenoms, setPrenoms] = useState('');
	const [sexe, setSexe] = useState('');
	const [dateNaissance, setDateNaissance] = useState('');
	const [identifiant, setIdentifiant] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addLogin',
				JSON.stringify(
					{
						"personne": {
							"nom": nom,
							"nomUsage": nomUsage,
							"prenoms": prenoms,
							"sexe": sexe,
							"dateNaissance": dateNaissance,
							"identifiant": identifiant,
						},
						"login": {
							"user": user,
							"pass": pass,
							"accesModel": {
								"idAcces": acces
							}
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
	useEffect(() => {
		fetch("http://localhost:8080/allAcces")
			.then(res => res.json())
			.then(
				(data) => {
					setListeAcces(data.result);
				}
			)
	}, [])

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un utilisateur" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-12'><b>PERSONNEL</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Nom</label>
								<input type="text" className='form-control' ref={nomRef} onChange={(e) => setNom(e.target.value)} value={nom} required />
							</div>
							<div className='col-sm-2'>
								<label>Nom d'usage</label>
								<input type="text" className='form-control' ref={nomUsageRef} onChange={(e) => setNomUsage(e.target.value)} value={nomUsage} required />
							</div>
							<div className='col-sm-2'>
								<label>Prénom</label>
								<input type="text" className='form-control' ref={prenomsRef} onChange={(e) => setPrenoms(e.target.value)} value={prenoms} required />
							</div>
							<div className='col-sm-2'>
								<label>Sexe</label>
								<select className='form-control' ref={sexeRef} onChange={(e) => setSexe(e.target.value)} value={sexe} required>
									<option>--</option>
									<option value="M">Masculin</option>
									<option value="F">Féminin</option>
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Date de naissance</label>
								<input type="date" className='form-control' ref={dateNaissanceRef} onChange={(e) => setDateNaissance(e.target.value)} value={dateNaissance} required />
							</div>
							<div className='col-sm-2'>
								<label>Identifiant</label>
								<input type="text" className='form-control' ref={identifiantRef} onChange={(e) => setIdentifiant(e.target.value)} value={identifiant} required />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-12'><b>LOGIN</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Nom d'utilisateur</label>
								<input type='text' className='form-control' ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
							</div>
							<div className='col-sm-2'>
								<label>Mot de passe</label>
								<input type='password' className='form-control' ref={passRef} onChange={(e) => setPass(e.target.value)} value={pass} required />
							</div>
							<div className='col-sm-2'>
								<label>Type d'accès</label>
								<select className='form-control' ref={accesRef} onChange={(e) => setAcces(e.target.value)} value={acces}>
									<option>--</option>
									{listeAcces.map(res => (
										res.codeAcces != "E" && (
											<option key={res.idAcces} value={res.idAcces}>{res.libelleAcces}</option>
										)
									))}
								</select>
							</div>
							<div className='col-sm-4'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des utilisateurs" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["NOM D'UTILISATEUR", "NIVEAU D'ACCES"]}
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