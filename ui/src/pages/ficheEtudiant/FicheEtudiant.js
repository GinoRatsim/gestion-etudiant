import React, { useRef, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PageTitle from "../../components/PageTitle";

import Moment from 'moment';

import jsPDF from 'jspdf';

import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
	content: {
		top: '25%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '30%',
	},
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export default function FicheEtudiant(props) {

	Moment.locale('fr');
	const { id } = useParams();
	var moyenne = 0;
	var nombreModule = 0;
	var creditObtenu = 0;
	const [isLoaded, setIsLoaded] = useState(false);
	const [etudiant, setEtudiant] = useState([]);
	const [niveau, setNiveau] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/oneEtudiant/" + id)
			.then(res => res.json())
			.then(
				(data) => {
					setEtudiant(data.result);
					fetch("http://localhost:8080/allNiveau/")
						.then(result => result.json())
						.then(
							(dataNiveau) => {
								setNiveau(dataNiveau.result);
								setIsLoaded(true);
							},
							(error) => {
								setIsLoaded(true);
							}
						)
				},
				(error) => {
					setIsLoaded(true);
				}
			)
	}, [])

	function genererBulletin(idNiveau, idEtudiant, nomA, prenoms) {

		var doc = new jsPDF('p', 'pt')
		doc.text(20, 50, 'BULLETIN DE NOTE')
		doc.setFont('courier')
		var ligneNote = 100;
		var nom;
		var niveau;
		var totalNotes = 0;
		var taille = 0;

		etudiant[3].map(
			rep => (
				rep.module.niveau.idNiveau === idNiveau ? (
					nom = rep.etudiant.personne.prenoms + " " + rep.etudiant.personne.nom,
					niveau = rep.module.niveau.libelleNiveau,
					doc.text(30, ligneNote, rep.module.libelleModule + " : " + rep.notes),
					taille += 1,
					totalNotes += rep.notes,
					ligneNote += 20
				) : (
					""
				)
			)
		)

		doc.text(20, ligneNote + 5, 'Moyenne : ' + totalNotes / taille)
		doc.text(20, 70, nom + ' - ' + niveau)
		doc.save('Bulletin' + prenoms + nom + idEtudiant + "-" + idNiveau + '.pdf');
	}

	function genererAttestationReussite(idNiveau, idEtudiant, nom, prenoms) {
		var doc = new jsPDF('p', 'pt')
		var nomEtudiant;
		var niveau;
		var totalNotes = 0;
		var taille = 0;
		var mention;
		doc.text(20, 50, 'ATTESTATION DE REUSSITE')
		doc.setFont('courier')
		doc.text(20, 100, "Je soussigné, Université SUPINFO, atteste que l'étudiant :")

		etudiant[3].map(
			rep => (
				nomEtudiant = rep.etudiant.personne.prenoms + " " + rep.etudiant.personne.nom,
				rep.module.niveau.idNiveau === idNiveau ? (
					niveau = rep.module.niveau.libelleNiveau,
					taille += 1,
					totalNotes += rep.notes
				) : (
					""
				)
			)
		)
		doc.text(40, 125, nomEtudiant)
		doc.text(20, 150, "est admise.")
		doc.text(40, 200, "Niveau : " + niveau)
		var moyenne = totalNotes / taille
		doc.text(40, 225, "Moyenne : " + moyenne)
		if ((moyenne === 10 || 10 < moyenne) && (moyenne < 12 || moyenne)) mention = "PASSABLE"
		if ((moyenne === 12 || 12 < moyenne) && (moyenne < 14 || moyenne)) mention = "ASSEZ BIEN"
		if ((moyenne === 14 || 14 < moyenne) && (moyenne < 16 || moyenne)) mention = "BIEN"
		if ((moyenne === 16 || 16 < moyenne) && (moyenne < 21 || moyenne)) mention = "TRES BIEN"
		doc.text(40, 250, "Mention : " + mention)
		doc.text(20, 300, "En foi de quoi, la présente attestation lui est délivrée")
		doc.text(20, 325, "pour servir et valoir ce que de droit.")

		doc.save('AttestationReussite' + prenoms + nom + idEtudiant + "-" + idNiveau + '.pdf');
	}

	const [listeModule, setListeModule] = useState([]);
	function ajoutModifNote(idNiveau, idEtudiant) {
		setIsOpen(true);
		setEtudiantAdd(idEtudiant);
		fetch("http://localhost:8080/allModuleByNiveau/" + idNiveau)
			.then(res => res.json())
			.then(
				(data) => {
					setListeModule(data.result);
				}
			)

	}

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	const etudiantAddRef = useRef();
	const moduleAddRef = useRef();
	const notesAddRef = useRef();
	const idNoteRef = useRef();

	const [etudiantAdd, setEtudiantAdd] = useState('');
	const [moduleAdd, setModuleAdd] = useState('');
	const [notesAdd, setNotesAdd] = useState('');
	const [idNote, setIdNote] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idNotes = document.getElementById('idNotes').value;
			if (idNotes > 0) {
				axios.post(
					'http://localhost:8080/updateNotes',
					JSON.stringify(
						{
							"idNotes": idNotes,
							"notes": notesAdd,
							"module": {
								"idModule": moduleAdd
							},
							"etudiant": {
								"idEtudiant": etudiantAdd
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).then(res => {
					window.location.reload(false);
				})
			} else {
				axios.post(
					'http://localhost:8080/addNotes',
					JSON.stringify(
						{
							"notes": notesAdd,
							"module": {
								"idModule": moduleAdd
							},
							"etudiant": {
								"idEtudiant": etudiantAdd
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
		}
		catch (err) {

		}
	}

	const handleChange = event => {
		setModuleAdd(event.target.value);
		fetch("http://localhost:8080/getByEtudiantModule/" + etudiantAdd + "/" + event.target.value)
			.then(res => res.json())
			.then(
				(data) => {
					if (data.result === null) {
						document.getElementById('btn-ajout').innerText = "Ajouter";
					} else {
						setIdNote(data.result.idNotes);
						setNotesAdd(data.result.notes);
						document.getElementById('btn-ajout').innerText = "Modifier";
					}
				}
			)
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	}
	
	console.log(localStorage.getItem('idPersonne'));

	if (etudiant) {
		return (
			<>
				{
					localStorage.getItem('id_token') === "DA" || localStorage.getItem('id_token') === "P" || localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('idEtudiant') === id ? (
						<div>
							<Modal
								isOpen={modalIsOpen}
								onRequestClose={closeModal}
								style={customStyles}
							>
								<h1>AJOUTER/MODIFIER UNE NOTE</h1>
								<div className='row'>
									<div className='col-sm-12'>&nbsp;</div>
								</div>
								<form onSubmit={add}>
									<div className='row'>
										<div className='col-sm-6'>
											<label>Module</label>
											<select className='form-control' ref={moduleAddRef} onChange={(e) => setModuleAdd(e.target.value)} value={moduleAdd} onChange={handleChange}>
												<option>--</option>
												{listeModule.map(res => (
													<option key={res.idModule} value={res.idModule}>{res.libelleModule}</option>
												))}
											</select>
										</div>
										<div className='col-sm-3'>
											<label>Note</label>
											<input type='number' min='0' max='20' className='form-control' ref={notesAddRef} onChange={(e) => setNotesAdd(e.target.value)} value={notesAdd} required />
										</div>
										<div className='col-sm-3'>
											<label>
												&nbsp;
												<input type="hidden" id="idOffresPro" className='form-control' disabled />
												<input type='hidden' id='idEtudiant' className='form-control' ref={etudiantAddRef} onChange={(e) => setEtudiantAdd(e.target.value)} value={etudiantAdd} disabled />
												<input type='hidden' id='idNotes' className='form-control' ref={idNoteRef} onChange={(e) => setIdNote(e.target.value)} value={idNote} disabled />
											</label>
											<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
										</div>
									</div>
								</form>
							</Modal>
							<PageTitle title="Fiche de l'étudiant" />
							<div className='row'>
								<div className='col-sm-4'>
									<table className='table bg-white'>
										<thead>
											<tr>
												<th colSpan='2' className='text-center'>PERSONNEL</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Identifiant</td>
												<td>{etudiant[0].personne.identifiant}</td>
											</tr>
											<tr>
												<td>Nom</td>
												<td>{etudiant[0].personne.nom}</td>
											</tr>
											<tr>
												<td>Prénom</td>
												<td>{etudiant[0].personne.prenoms}</td>
											</tr>
											<tr>
												<td>Sexe</td>
												<td>{etudiant[0].personne.sexe === "M" ? "Masculin" : "Féminin"}</td>
											</tr>
											<tr>
												<td>Date de naissance</td>
												<td>{Moment(etudiant[0].personne.dateNaissance).format('DD/MM/yyyy')}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col-sm-4'>
									<table className='table bg-white'>
										<thead>
											<tr>
												<th colSpan='2' className='text-center'>ADRESSE</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Adresse email personnel</td>
												<td>{etudiant[1].adresseEmailPerso}</td>
											</tr>
											<tr>
												<td>Adresse email Supinfo</td>
												<td>{etudiant[1].adresseEmailSupinfo}</td>
											</tr>
											<tr>
												<td>Numéro téléphone personnel</td>
												<td>{etudiant[1].numTelephonePerso}</td>
											</tr>
											<tr>
												<td>Numéro téléphone Supinfo</td>
												<td>{etudiant[1].numTelephoneSupinfo}</td>
											</tr>
											<tr>
												<td>Adresse</td>
												<td>{etudiant[1].libelleAdresse}</td>
											</tr>
											<tr>
												<td>Code postal</td>
												<td>{etudiant[1].codePostal}</td>
											</tr>
											<tr>
												<td>Ville</td>
												<td>{etudiant[1].ville}</td>
											</tr>
											<tr>
												<td>Région</td>
												<td>{etudiant[1].region}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col-sm-4'>
									<table className='table bg-white'>
										<thead>
											<tr>
												<th colSpan='2' className='text-center'>SCOLAIRE</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Debut de l'année scolaire</td>
												<td>{Moment(etudiant[0].debutAnneeScolaire).format('DD/MM/yyyy')}</td>
											</tr>
											<tr>
												<td>Fin de l'année scolaire</td>
												<td>{Moment(etudiant[0].finAnneeScolaire).format('DD/MM/yyyy')}</td>
											</tr>
											<tr>
												<td>Niveau</td>
												<td>{etudiant[0].niveau.libelleNiveau}</td>
											</tr>
											<tr>
												<td>Spécialité</td>
												<td>{etudiant[0].specialite.libelleSpecialite}</td>
											</tr>
											<tr>
												<td>Type de formation</td>
												<td>{etudiant[0].typeFormation.libelleTypeFormation}</td>
											</tr>
											<tr>
												<td>Contrat</td>
												<td>{etudiant[0].contrat.typeContrat.libelleTypeContrat}</td>
											</tr>
											<tr>
												<td>Crédits obtenus</td>
												<td>{etudiant[0].creditTotalObtenus}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<PageTitle title="Notes de l'étudiant" />
							<div className='row'>
								{
									niveau.map(
										res => (
											<div className='col-sm-3' key={res.idNiveau}>
												<table className='table bg-white'>
													<thead>
														<tr className='bg-info text-light'>
															<th colSpan='3' className='text-center'>{res.libelleNiveau}</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>COURS</td>
															<td>NOTES</td>
															<td>CREDITS</td>
														</tr>
														{
															moyenne = 0,
															nombreModule = 0,
															creditObtenu = 0,
															etudiant[3].map(
																rep => (
																	res.idNiveau === rep.module.niveau.idNiveau ? (
																		moyenne += rep.notes,
																		nombreModule += 1,
																		creditObtenu += rep.notes >= 10 ? rep.module.creditRequis : 0,
																		<tr key={res.idNiveau + "" + rep.idNotes}>
																			<td>{rep.module.libelleModule}</td>
																			<td>{rep.notes}</td>
																			<td>{rep.notes >= 10 ? rep.module.creditRequis : 0}</td>
																		</tr>
																	) : (
																		<tr key={res.idNiveau + "" + rep.idNotes}>

																		</tr>
																	)
																)
															)
														}
														<tr>
															<td colSpan='2'><b>Moyenne</b></td>
															<td><b>{moyenne > 0 ? (moyenne / nombreModule).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</b></td>
														</tr>
														<tr>
															<td colSpan='2'><b>Crédit obtenus</b></td>
															<td><b>{creditObtenu}</b></td>
														</tr>

														{
															localStorage.getItem('id_token') === "ADMIN" ? (
																<tr>
																	<td colSpan='3'>
																		<button className='btn btn-info btn-block' onClick={() => ajoutModifNote(res.idNiveau, etudiant[0].idEtudiant)}>Ajouter / modifier les notes</button>
																	</td>
																</tr>
															) : (
																<tr>

																</tr>
															)
														}

														{
															moyenne > 0 && (localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA") ? (
																<tr>
																	<td colSpan='3'>
																		<button className='btn btn-primary btn-block' onClick={() => genererBulletin(res.idNiveau, etudiant[0].idEtudiant, etudiant[0].personne.nom, etudiant[0].personne.prenoms)}>Générer le bulletin de note</button>
																	</td>
																</tr>
															) : (
																<tr>

																</tr>
															)
														}

														{
															moyenne > 0 && (localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA") && moyenne / nombreModule >= 10 ? (
																<tr>
																	<td colSpan='3'>
																		<button className='btn btn-success btn-block' onClick={() => genererAttestationReussite(res.idNiveau, etudiant[0].idEtudiant, etudiant[0].personne.nom, etudiant[0].personne.prenoms)}>Générer l'attestation de réussite</button>
																	</td>
																</tr>
															) : (
																<tr>

																</tr>
															)
														}
													</tbody>
												</table>
											</div>
										)
									)
								}
							</div>
						</div>
					) : (
						<Redirect to={{ pathname: "/app/dashboard" }} />
					)
				}
			</>
		);
	}
}