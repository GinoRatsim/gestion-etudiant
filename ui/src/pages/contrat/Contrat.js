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
export default function Contrat(props) {

	Moment.locale('fr');

	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.entreprise.nomEntreprise, item.nomPrenomEncadreur, item.adresseEmailEncadreur, item.telephoneEncadreur, Moment(item.dateDebutContrat).format('DD/MM/yyyy') + " - " + Moment(item.dateFinContrat).format('DD/MM/yyyy'), item.dureeContrat, item.typeContrat.libelleTypeContrat, item.fichierContrat, item.fichierConvention]
	});

	const entrepriseRef = useRef();
	const nomPrenomEncadreurRef = useRef();
	const adresseEmailEncadreurRef = useRef();
	const telephoneEncadreurRef = useRef();
	const dateDebutContratRef = useRef();
	const dateFinContratRef = useRef();
	const dureeContratRef = useRef();
	const typeContratRef = useRef();
	const fichierContratRef = useRef();
	const fichierConventionRef = useRef();

	const [entreprise, setEntreprise] = useState('');
	const [nomPrenomEncadreur, setNomPrenomEncadreur] = useState('');
	const [adresseEmailEncadreur, setAdresseEmailEncadreur] = useState('');
	const [telephoneEncadreur, setTelephoneEncadreur] = useState('');
	const [dateDebutContrat, setDateDebutContrat] = useState('');
	const [dateFinContrat, setDateFinContrat] = useState('');
	const [dureeContrat, setDureeContrat] = useState('');
	const [typeContrat, setTypeContrat] = useState('');
	const [fichierContrat, setFichierContrat] = useState('');
	const [fichierConvention, setFichierConvention] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addContrat',
				JSON.stringify(
					{
						"entreprise": {
							"idEntreprise": entreprise
						},
						"typeContrat": {
							"idTypeContrat": typeContrat
						},
						"dureeContrat": dureeContrat,
						"nomPrenomEncadreur": nomPrenomEncadreur,
						"telephoneEncadreur": telephoneEncadreur,
						"adresseEmailEncadreur": adresseEmailEncadreur,
						"dateDebutContrat": dateDebutContrat,
						"dateFinContrat": dateFinContrat,
						"fichierContrat": document.getElementById('fichierContrat').files[0].name,
						"fichierConvention": document.getElementById('fichierConvention').files[0].name,
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
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un contrat" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
								<label>Entreprise</label>
								<select className='form-control' ref={entrepriseRef} onChange={(e) => setEntreprise(e.target.value)} value={entreprise}>
									<option>--</option>
									{listeEntreprise.map(res => (
										<option key={res.idEntreprise} value={res.idEntreprise}>{res.nomEntreprise} - {res.adresseEntreprise}, {res.codePostalEntreprise} {res.villeEntreprise}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Nom de l'encadreur</label>
								<input type='text' className='form-control' ref={nomPrenomEncadreurRef} onChange={(e) => setNomPrenomEncadreur(e.target.value)} value={nomPrenomEncadreur} required />
							</div>
							<div className='col-sm-2'>
								<label>Mail de l'encadreur</label>
								<input type='text' className='form-control' ref={adresseEmailEncadreurRef} onChange={(e) => setAdresseEmailEncadreur(e.target.value)} value={adresseEmailEncadreur} required />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone de l'encadreur</label>
								<input type='text' className='form-control' ref={telephoneEncadreurRef} onChange={(e) => setTelephoneEncadreur(e.target.value)} value={telephoneEncadreur} required />
							</div>
							<div className='col-sm-2'>
								<label>Date de début du contrat</label>
								<input type='date' className='form-control' ref={dateDebutContratRef} onChange={(e) => setDateDebutContrat(e.target.value)} value={dateDebutContrat} required />
							</div>
							<div className='col-sm-2'>
								<label>Date de fin du contrat</label>
								<input type='date' className='form-control' ref={dateFinContratRef} onChange={(e) => setDateFinContrat(e.target.value)} value={dateFinContrat} required />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Durée du contrat</label>
								<input type='number' min='0' className='form-control' ref={dureeContratRef} onChange={(e) => setDureeContrat(e.target.value)} value={dureeContrat} required />
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
								<label>Contrat</label>
								<input type="file" className='form-control' id="fichierContrat" ref={fichierContratRef} onChange={(e) => setFichierContrat(e.target.value)} value={fichierContrat} required />
							</div>
							<div className='col-sm-2'>
								<label>Convention</label>
								<input type="file" className='form-control' id="fichierConvention" ref={fichierConventionRef} onChange={(e) => setFichierConvention(e.target.value)} value={fichierConvention} required />
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des contrats" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["ENTREPRISE", "NOM DE L'ENCADREUR", "MAIL DE L'ENCADREUR", "TELEPHONE DE L'ENCADREUR", "VALIDITE", "DUREE DU CONTRAT", "TYPE DE CONTRAT", "CONTRAT", "CONVENTION"]}
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