import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';

export default function Entreprise(props) {
	var datatableData = [];

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEntreprise")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [item.nomEntreprise, item.secteurActiviteEntreprise, item.responsableEntreprise, item.telephoneEntreprise, item.mailEntreprise, item.adresseEntreprise, item.codePostalEntreprise, item.villeEntreprise]
	});

	const nomEntrepriseRef = useRef();
	const secteurActiviteEntrepriseRef = useRef();
	const adresseEntrepriseRef = useRef();
	const codePostalEntrepriseRef = useRef();
	const villeEntrepriseRef = useRef();
	const telephoneEntrepriseRef = useRef();
	const responsableEntrepriseRef = useRef();
	const mailEntrepriseRef = useRef();

	const [nomEntreprise, setNomEntreprise] = useState('');
	const [secteurActiviteEntreprise, setSecteurActiviteEntreprise] = useState('');
	const [adresseEntreprise, setAdresseEntreprise] = useState('');
	const [codePostalEntreprise, setCodePostalEntreprise] = useState('');
	const [villeEntreprise, setVilleEntreprise] = useState('');
	const [telephoneEntreprise, setTelephoneEntreprise] = useState('');
	const [responsableEntreprise, setResponsableEntreprise] = useState('');
	const [mailEntreprise, setMailEntreprise] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addEntreprise',
				JSON.stringify(
					{
						"nomEntreprise": nomEntreprise,
						"secteurActiviteEntreprise": secteurActiviteEntreprise,
						"adresseEntreprise": adresseEntreprise,
						"codePostalEntreprise": codePostalEntreprise,
						"villeEntreprise": villeEntreprise,
						"telephoneEntreprise": telephoneEntreprise,
						"responsableEntreprise": responsableEntreprise,
						"mailEntreprise": mailEntreprise
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
					<PageTitle title="Ajouter un entreprise" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
								<label>Nom</label>
								<input type='text' className='form-control' ref={nomEntrepriseRef} onChange={(e) => setNomEntreprise(e.target.value)} value={nomEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Secteur d'activité</label>
								<input type='text' className='form-control' ref={secteurActiviteEntrepriseRef} onChange={(e) => setSecteurActiviteEntreprise(e.target.value)} value={secteurActiviteEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Responsable</label>
								<input type='text' className='form-control' ref={responsableEntrepriseRef} onChange={(e) => setResponsableEntreprise(e.target.value)} value={responsableEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone</label>
								<input type='text' className='form-control' ref={telephoneEntrepriseRef} onChange={(e) => setTelephoneEntreprise(e.target.value)} value={telephoneEntreprise} required />
							</div>
							<div className='col-sm-4'></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Adresse</label>
								<input type='text' className='form-control' ref={adresseEntrepriseRef} onChange={(e) => setAdresseEntreprise(e.target.value)} value={adresseEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Code postal</label>
								<input type='text' className='form-control' ref={codePostalEntrepriseRef} onChange={(e) => setCodePostalEntreprise(e.target.value)} value={codePostalEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Ville</label>
								<input type='text' className='form-control' ref={villeEntrepriseRef} onChange={(e) => setVilleEntreprise(e.target.value)} value={villeEntreprise} required />
							</div>
							<div className='col-sm-2'>
								<label>Mail</label>
								<input type='text' className='form-control' ref={mailEntrepriseRef} onChange={(e) => setMailEntreprise(e.target.value)} value={mailEntreprise} required />
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des entreprises" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["NOM", "SECTEUR D'ACTIVITE", "RESPONSABLE", "TELEPHONE", "MAIL", "ADRESSE", "CODE POSTAL", "VILLE"]}
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