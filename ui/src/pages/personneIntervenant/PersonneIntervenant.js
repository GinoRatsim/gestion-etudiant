import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const getMuiTheme = () => createMuiTheme({
	overrides: {
		MuiTableCell: {
			head: {
				backgroundColor: "rgba(211, 211, 211, 0.5) !important",
				
			}
		}
	}
});
export default function PersonneIntervenant(props) {
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allPersonneIntervenant")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

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

	const [listeIntervenant, setListeIntervenant] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allIntervenant")
			.then(res => res.json())
			.then(
				(data) => {
					setListeIntervenant(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [item.personne.identifiant, item.personne.prenoms + " " + item.personne.nom, item.intervenant.libelleIntervenant, item.campus.libelleCampus]
	});


	const intervenantRef = useRef();
	const campusRef = useRef();
	const dateDebutSituationRef = useRef();
	const dateFinSituationRef = useRef();

	const [intervenant, setIntervenant] = useState('');
	const [campus, setCampus] = useState('');
	const [dateDebutSituation, setDateDebutSituation] = useState('');
	const [dateFinSituation, setDateFinSituation] = useState('');

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
				'http://localhost:8080/addPersonneIntervenant',
				JSON.stringify(
					{
						"dateDebutSituation": dateDebutSituation,
						"dateFinSituation": dateFinSituation,
						"campus": {
							"idCampus": campus
						},
						"intervenant": {
							"idIntervenant": intervenant
						},
						"personne": {
							"nom": nom,
							"nomUsage": nomUsage,
							"prenoms": prenoms,
							"sexe": sexe,
							"dateNaissance": dateNaissance,
							"identifiant": identifiant,
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
							<div className='col-sm-12'><b>AUTRES INFOS</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Date de début de situation</label>
								<input type="date" className='form-control' ref={dateDebutSituationRef} onChange={(e) => setDateDebutSituation(e.target.value)} value={dateDebutSituation} required />
							</div>
							<div className='col-sm-2'>
								<label>Date de fin de situation</label>
								<input type="date" className='form-control' ref={dateFinSituationRef} onChange={(e) => setDateFinSituation(e.target.value)} value={dateFinSituation} required />
							</div>
							<div className='col-sm-2'>
								<label>Campus</label>
								<select className='form-control' ref={campusRef} onChange={(e) => setCampus(e.target.value)} value={campus} required >
									<option>--</option>
									{listeCampus.map(res => (
										<option key={res.idCampus} value={res.idCampus}>{res.libelleCampus}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Intervenant</label>
								<select className='form-control' ref={intervenantRef} onChange={(e) => setIntervenant(e.target.value)} value={intervenant} required >
									<option>--</option>
									{listeIntervenant.map(res => (
										<option key={res.idIntervenant} value={res.idIntervenant}>{res.libelleIntervenant}</option>
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
					<PageTitle title="Liste des utilisateurs" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["IDENTIFIANT", "RESPONSABLE", "INTERVENANT", "CAMPUS"]}
									options={{
										selectableRows: 'none'
									}}
								/>
							</MuiThemeProvider>
						</Grid>
					</Grid>
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}