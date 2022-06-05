import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PageTitle from "../../components/PageTitle";

import Moment from 'moment';

import jsPDF from 'jspdf'

export default function FicheEtudiant(props) {

	Moment.locale('fr');
	const { id } = useParams();
	var moyenne = 0;
	var nombreModule = 0;
	var creditObtenu = 0;
	var idEtudiant = 0;
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

	function genererBulletin(idNiveau, idEtudiant) {
		var doc = new jsPDF('p', 'pt')
		doc.text(20, 20, 'This is default text')
		doc.setFont('courier')
		doc.text(20, 30, 'This is text with courier font')
		doc.save(idEtudiant+"-"+idNiveau+'.pdf');
	}

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	if (etudiant) {
		idEtudiant = etudiant[0].idEtudiant;
		return (
			<>
				{
					localStorage.getItem('id_token') === "DA" ? (
						<div>
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
															moyenne > 0 ? (
																<tr>
																	<td colSpan='3'>
																		<button className='btn btn-secondary btn-block' onClick={() => genererBulletin(res.idNiveau, idEtudiant)}>Générer le bulletin de note</button>
																	</td>
																</tr>
															) : (
																<tr>
																	<td colSpan='3'> </td>
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