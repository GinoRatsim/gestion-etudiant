import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';
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
export default function SuiviAbsences(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAbsences")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

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
	donnee.forEach(function(item, i) {
		datatableData[i] = [
			item.etudiant.personne.identifiant,
			item.etudiant.personne.nom,
			item.etudiant.personne.prenoms,
			Moment(item.dateDebutAbsences).format('DD/MM/yyyy'),
			Moment(item.dateFinAbsences).format('DD/MM/yyyy'),
			item.estJustifie ? "OUI" : "NON"
		]
	});

	const etudiantRef = useRef();
	const dateDebutAbsencesRef = useRef();
	const dateFinAbsencesRef = useRef();
	const estJustifieRef = useRef();

	const [etudiant, setEtudiant] = useState('');
	const [dateDebutAbsences, setDateDebutAbsences] = useState('');
	const [dateFinAbsences, setDateFinAbsences] = useState('');
	const [estJustifie, setEstJustifie] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addAbsences',
				JSON.stringify(
					{
						"dateDebutAbsences": dateDebutAbsences,
						"dateFinAbsences": dateFinAbsences,
						"estJustifie": estJustifie,
						"etudiant": {
							"idEtudiant": etudiant
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

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "P" ? (
				<div>
					<PageTitle title="Ajouter une absence" />
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
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-3'>
								<label>Date de début</label>
								<input type="datetime-local" className='form-control' ref={dateDebutAbsencesRef} onChange={(e) => setDateDebutAbsences(e.target.value)} value={dateDebutAbsences} required />
							</div>
							<div className='col-sm-3'>
								<label>Date de fin</label>
								<input type="datetime-local" className='form-control' ref={dateFinAbsencesRef} onChange={(e) => setDateFinAbsences(e.target.value)} value={dateFinAbsences} required />
							</div>
							<div className='col-sm-3'>
								<label>Justifié</label>
								<select className='form-control' ref={estJustifieRef} onChange={(e) => setEstJustifie(e.target.value)} value={estJustifie}>
									<option value="">--</option>
									<option value="1">Oui</option>
									<option value="0">Non</option>
								</select>
							</div>
							<div className='col-sm-1'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des absences" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["IDENTIFIANT", "NOM", "PRENOM", "DATE DE DEBUT", "DATE DE FIN", "JUSTIFIE"]}
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