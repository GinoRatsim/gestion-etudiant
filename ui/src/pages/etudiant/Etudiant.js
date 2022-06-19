import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";
import {
	RemoveRedEye
} from "@material-ui/icons";
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
export default function Etudiant(props) {

	Moment.locale('fr');

	var datatableData = [];

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

	//ADRESSE
	const actuelAdresseRef = useRef();
	const adresseEmailPersoRef = useRef();
	const adresseEmailSupinfoRef = useRef();
	const codePostalRef = useRef();
	const libelleAdresseRef = useRef();
	const numTelephonePersoRef = useRef();
	const numTelephoneSupinfoRef = useRef();
	const regionRef = useRef();
	const villeRef = useRef();

	const [actuelAdresse, setActuelAdresse] = useState('');
	const [adresseEmailPerso, setAdresseEmailPerso] = useState('');
	const [adresseEmailSupinfo, setAdresseEmailSupinfo] = useState('');
	const [codePostal, setCodePostal] = useState('');
	const [libelleAdresse, setLibelleAdresse] = useState('');
	const [numTelephonePerso, setNumTelephonePerso] = useState('');
	const [numTelephoneSupinfo, setNumTelephoneSupinfo] = useState('');
	const [region, setRegion] = useState('');
	const [ville, setVille] = useState('');

	//ETUDIANT
	const actuelEtudiantRef = useRef();
	const creditTotalObtenusRef = useRef();
	const anneeScolaireRef = useRef();
	const contratRef = useRef();
	const niveauRef = useRef();
	const specialiteRef = useRef();
	const typeFormationRef = useRef();
	const campusRef = useRef();

	const [actuelEtudiant, setActuelEtudiant] = useState('');
	const [creditTotalObtenus, setCreditTotalObtenus] = useState('');
	const [anneeScolaire, setAnneeScolaire] = useState('');
	const [contrat, setContrat] = useState('');
	const [niveau, setNiveau] = useState('');
	const [specialite, setSpecialite] = useState('');
	const [typeFormation, setTypeFormation] = useState('');
	const [campus, setCampus] = useState('');

	//LOGIN
	const userRef = useRef();
	const passRef = useRef();

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addEtudiant',
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
						"adresse": {
							"actuel": actuelAdresse,
							"adresseEmailPerso": adresseEmailPerso,
							"adresseEmailSupinfo": adresseEmailSupinfo,
							"codePostal": codePostal,
							"libelleAdresse": libelleAdresse,
							"numTelephonePerso": numTelephonePerso,
							"numTelephoneSupinfo": numTelephoneSupinfo,
							"region": region,
							"ville": ville,
						},
						"etudiant": {
							"admis": 0,
							"actuel": actuelEtudiant,
							"creditTotalObtenus": creditTotalObtenus,
							"anneeScolaire": {
								"idAnneeScolaire": anneeScolaire
							},
							"contrat": {
								"idContrat": contrat
							},
							"niveau": {
								"idNiveau": niveau
							},
							"specialite": {
								"idSpecialite": specialite
							},
							"typeFormation": {
								"idTypeFormation": typeFormation
							},
							"campus": {
								"idCampus": campus
							},
						},
						"login": {
							"user": user,
							"pass": pass
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

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allEtudiantActuel")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])
	donnee.forEach(function(item, i) {
		datatableData[i] = [item.personne.identifiant, item.personne.nom, item.personne.prenoms, Moment(item.debutAnneeScolaire).format('DD/MM/yyyy') + " - " + Moment(item.finAnneeScolaire).format('DD/MM/yyyy'), item.niveau.libelleNiveau, item.typeFormation.libelleTypeFormation, item.contrat.typeContrat.libelleTypeContrat, item.specialite.libelleSpecialite, item.creditTotalObtenus, item.idEtudiant]
	});

	const [listeTypeFormation, setListeTypeFormation] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypeFormation")
			.then(res => res.json())
			.then(
				(data) => {
					setListeTypeFormation(data.result);
				}
			)
	}, [])

	const [listeNiveau, setListeNiveau] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setListeNiveau(data.result);
				}
			)
	}, [])

	const [listeSpecialite, setListeSpecialite] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allSpecialite")
			.then(res => res.json())
			.then(
				(data) => {
					setListeSpecialite(data.result);
				}
			)
	}, [])


	const [listeContrat, setListeContrat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/contratDispoEtudiant")
			.then(res => res.json())
			.then(
				(data) => {
					setListeContrat(data.result);
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


	const [listeAnneeScolaire, setListeAnneeScolaire] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allAnneeScolaire")
			.then(res => res.json())
			.then(
				(data) => {
					setListeAnneeScolaire(data.result);
				}
			)
	}, [])

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un étudiant" />
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
							<div className='col-sm-12'><b>ADRESSE</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Actuel</label>
								<input type="number" min='0' className='form-control' ref={actuelAdresseRef} onChange={(e) => setActuelAdresse(e.target.value)} value={actuelAdresse} required />
							</div>
							<div className='col-sm-2'>
								<label>Email personnel</label>
								<input type="text" className='form-control' ref={adresseEmailPersoRef} onChange={(e) => setAdresseEmailPerso(e.target.value)} value={adresseEmailPerso} required />
							</div>
							<div className='col-sm-2'>
								<label>Email Supinfo</label>
								<input type="text" className='form-control' ref={adresseEmailSupinfoRef} onChange={(e) => setAdresseEmailSupinfo(e.target.value)} value={adresseEmailSupinfo} required />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone personnel</label>
								<input type="text" className='form-control' ref={numTelephonePersoRef} onChange={(e) => setNumTelephonePerso(e.target.value)} value={numTelephonePerso} required />
							</div>
							<div className='col-sm-2'>
								<label>Téléphone Supinfo</label>
								<input type="text" className='form-control' ref={numTelephoneSupinfoRef} onChange={(e) => setNumTelephoneSupinfo(e.target.value)} value={numTelephoneSupinfo} required />
							</div>
							<div className='col-sm-2'>
								<label>Adresse</label>
								<input type="text" className='form-control' ref={libelleAdresseRef} onChange={(e) => setLibelleAdresse(e.target.value)} value={libelleAdresse} required />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Code postal</label>
								<input type="number" min='0' className='form-control' ref={codePostalRef} onChange={(e) => setCodePostal(e.target.value)} value={codePostal} required />
							</div>
							<div className='col-sm-2'>
								<label>Ville</label>
								<input type="text" className='form-control' ref={villeRef} onChange={(e) => setVille(e.target.value)} value={ville} required />
							</div>
							<div className='col-sm-2'>
								<label>Région</label>
								<input type="text" className='form-control' ref={regionRef} onChange={(e) => setRegion(e.target.value)} value={region} required />
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-12'><b>SCOLAIRE</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Actuel</label>
								<input type="number" min="0" className='form-control' ref={actuelEtudiantRef} onChange={(e) => setActuelEtudiant(e.target.value)} value={actuelEtudiant} required />
							</div>
							<div className='col-sm-2'>
								<label>Crédit total obtenus</label>
								<input type="number" min="0" className='form-control' ref={creditTotalObtenusRef} onChange={(e) => setCreditTotalObtenus(e.target.value)} value={creditTotalObtenus} required />
							</div>
							<div className='col-sm-2'>
								<label>Année scolaire</label>
								<select className='form-control' ref={anneeScolaireRef} onChange={(e) => setAnneeScolaire(e.target.value)} value={anneeScolaire} required >
									<option>--</option>
									{listeAnneeScolaire.map(res => (
										<option key={res.idAnneeScolaire} value={res.idAnneeScolaire}>{res.annee}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Contrat</label>
								<select className='form-control' ref={contratRef} onChange={(e) => setContrat(e.target.value)} value={contrat} required >
									<option>--</option>
									{listeContrat.map(res => (
										<option key={res.idContrat} value={res.idContrat}>{res.typeContrat.libelleTypeContrat} / {res.entreprise.nomEntreprise} / {Moment(res.dateDebutContrat).format('DD/MM/yyyy')} - {Moment(res.dataFinContrat).format('DD/MM/yyyy')} / {res.dureeContrat} an(s)</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Niveau</label>
								<select className='form-control' ref={niveauRef} onChange={(e) => setNiveau(e.target.value)} value={niveau} required >
									<option>--</option>
									{listeNiveau.map(res => (
										<option key={res.idNiveau} value={res.idNiveau}>{res.libelleNiveau}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'>
								<label>Spécialité</label>
								<select className='form-control' ref={specialiteRef} onChange={(e) => setSpecialite(e.target.value)} value={specialite} required >
									<option>--</option>
									{listeSpecialite.map(res => (
										<option key={res.idSpecialite} value={res.idSpecialite}>{res.libelleSpecialite}</option>
									))}
								</select>
							</div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Type de formation</label>
								<select className='form-control' ref={typeFormationRef} onChange={(e) => setTypeFormation(e.target.value)} value={typeFormation} required >
									<option>--</option>
									{listeTypeFormation.map(res => (
										<option key={res.idTypeFormation} value={res.idTypeFormation}>{res.libelleTypeFormation}</option>
									))}
								</select>
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
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-12'><b>CONNEXION</b></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-2'>
								<label>Utilisateur</label>
								<input type="text" className='form-control' ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
							</div>
							<div className='col-sm-2'>
								<label>Mot de passe</label>
								<input type="text" className='form-control' ref={passRef} onChange={(e) => setPass(e.target.value)} value={pass} required />
							</div>
							<div className='col-sm-6'></div>
							<div className='col-sm-2'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des étudiants" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MuiThemeProvider theme={getMuiTheme()}>
								<MUIDataTable
									data={datatableData}
									columns={["IDENTIFIANT", "NOM", "PRENOM", "ANNEE SCOLAIRE", "NIVEAU", "FORMATION", "CONTRAT", "SPECIALITE", "CREDIT OBTENUS",
										{
											name: "",
											options: {
												customBodyRender: (value, tableMeta, updateValue) => {
													return (
														<div>
															<button className='btn btn-success' onClick={() => voirDetail(props.history, value)}>
																<RemoveRedEye />
															</button>
														</div>
													);
												}
											}
										}]}
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

function voirDetail(history, idEtudiant) {
	history.push("/app/ficheEtudiant/" + idEtudiant);
}