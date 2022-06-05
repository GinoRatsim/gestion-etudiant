import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import Moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';

import {
	RemoveRedEye,
	Edit,
	Delete
} from "@material-ui/icons";

const customStyles = {
	content: {
		top: '25%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '50%'
	},
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function Partenariat(props) {
	Moment.locale('fr');
	var datatableData = [];

	const [listeNaturePartenariat, setListeNaturePartenariat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allNaturePartenariat")
			.then(res => res.json())
			.then(
				(data) => {
					setListeNaturePartenariat(data.result);
				}
			)
	}, [])

	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allPartenariats")
			.then(res => res.json())
			.then(
				(data) => {
					setDonnee(data.result);
				}
			)
	}, [])

	donnee.forEach(function(item, i) {
		datatableData[i] = [Moment(item.dateDebutPartenariat).format('DD/MM/yyyy'), Moment(item.dateFinPartenariat).format('DD/MM/yyyy'), item.libellePartenariatCourte, item.libellePartenariatLong, item.naturePartenariat.libelleNaturePartenariat, item.idPartenariats]
	});

	const dateDebutPartenariatRef = useRef();
	const dateFinPartenariatRef = useRef();
	const descriptionRef = useRef();
	const libellePartenariatCourteRef = useRef();
	const libellePartenariatLongRef = useRef();
	const naturePartenariatRef = useRef();

	const [dateDebutPartenariat, setDateDebutPartenariat] = useState('');
	const [dateFinPartenariat, setDateFinPartenariat] = useState('');
	const [description, setDescription] = useState('');
	const [libellePartenariatCourte, setLibellePartenariatCourte] = useState('');
	const [libellePartenariatLong, setLibellePartenariatLong] = useState('');
	const [naturePartenariat, setNaturePartenariat] = useState('');

	const add = async (e) => {
		e.preventDefault();
		try {
			var idPartenariats = document.getElementById('idPartenariats').value;
			if (idPartenariats > 0) {
				axios.post(
					'http://localhost:8080/updatePartenariats',
					JSON.stringify(
						{
							"idPartenariats": idPartenariats,
							"dateDebutPartenariat": dateDebutPartenariat,
							"dateFinPartenariat": dateFinPartenariat,
							"description": description,
							"libellePartenariatCourte": libellePartenariatCourte,
							"libellePartenariatLong": libellePartenariatLong,
							"naturePartenariat": {
								"idNaturePartenariat": naturePartenariat
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}
			else {
				axios.post(
					'http://localhost:8080/addPartenariats',
					JSON.stringify(
						{
							"idPartenariats": 0,
							"dateDebutPartenariat": dateDebutPartenariat,
							"dateFinPartenariat": dateFinPartenariat,
							"description": description,
							"libellePartenariatCourte": libellePartenariatCourte,
							"libellePartenariatLong": libellePartenariatLong,
							"naturePartenariat": {
								"idNaturePartenariat": naturePartenariat
							}
						}
					),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}
			window.location.reload(false);
		}
		catch (err) {

		}
	}

	function voir(id) {
		setIsOpen(true);
		fetch("http://localhost:8080/onePartenariats/" + id)
			.then(async response => {
				const data = await response.json();
				console.log(data.result);
				document.getElementById('desc').innerHTML = data.result.description;
				document.getElementById('dateDebut').innerHTML = Moment(data.result.dateDebutPartenariat).format('DD/MM/yyyy');
				document.getElementById('dateFin').innerHTML = Moment(data.result.dateFinPartenariat).format('DD/MM/yyyy');
				document.getElementById('libelleCourte').innerHTML = data.result.libellePartenariatCourte;
				document.getElementById('LibelleLongue').innerHTML = data.result.libellePartenariatLong;
				document.getElementById('nature').innerHTML = data.result.naturePartenariat.idNaturePartenariat;
			})
	}

	function modifier(id) {
		document.getElementById('idPartenariats').value = id;
		document.getElementById('btn-ajout').innerText = "Modifier";
		fetch("http://localhost:8080/onePartenariats/" + id)
			.then(async response => {
				const data = await response.json();
				console.log(data.result.naturePartenariat);
				setNaturePartenariat(data.result.naturePartenariat.idNaturePartenariat);
				setDateDebutPartenariat(Moment(data.result.dateDebutPartenariat).format('yyyy-MM-DD'));
				setDateFinPartenariat(Moment(data.result.dateFinPartenariat).format('yyyy-MM-DD'));
				setLibellePartenariatCourte(data.result.libellePartenariatCourte);
				setLibellePartenariatLong(data.result.libellePartenariatLong);
				setDescription(data.result.description);
			})
	}

	function supprimer(id) {
		fetch("http://localhost:8080/deletePartenariats/" + id)
		window.location.reload(false);
	}

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" || localStorage.getItem('id_token') === "DA" ? (
				<div>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						style={customStyles}
					>
						<h1>Détails</h1>
						<table className='table'>
							<thead>
							</thead>
							<tbody>
								<tr>
									<td><b>DATE DEBUT</b></td>
									<td><b>DATE FIN</b></td>
									<td><b>LIBELLE COURTE</b></td>
									<td><b>LIBELLE LONGUE</b></td>
									<td><b>NATURE</b></td>
								</tr>
								<tr>
									<td><div id='dateDebut'></div></td>
									<td><div id='dateFin'></div></td>
									<td><div id='libelleCourte'></div></td>
									<td><div id='LibelleLongue'></div></td>
									<td><div id='nature'></div></td>
								</tr>
								<tr>
									<td colSpan="5"><b>DESCRIPTION</b></td>
								</tr>
								<tr>
									<td colSpan="5"><div id='desc'></div></td>
								</tr>
							</tbody>
						</table>
					</Modal>

					<PageTitle title="Ajouter un partenariat" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-2'>
								<label>Date de début</label>
								<input type='date' className='form-control' id='dateDebutPartenariat' ref={dateDebutPartenariatRef} onChange={(e) => setDateDebutPartenariat(e.target.value)} value={dateDebutPartenariat} />
							</div>
							<div className='col-sm-2'>
								<label>Date de fin</label>
								<input type='date' className='form-control' id='dateFinPartenariat' ref={dateFinPartenariatRef} onChange={(e) => setDateFinPartenariat(e.target.value)} value={dateFinPartenariat} />
							</div>
							<div className='col-sm-2'>
								<label>Libellé courte</label>
								<input type='text' className='form-control' id='libellePartenariatCourte' ref={libellePartenariatCourteRef} onChange={(e) => setLibellePartenariatCourte(e.target.value)} value={libellePartenariatCourte} />
							</div>
							<div className='col-sm-2'>
								<label>Libellé long</label>
								<input type='text' className='form-control' id='libellePartenariatLong' ref={libellePartenariatLongRef} onChange={(e) => setLibellePartenariatLong(e.target.value)} value={libellePartenariatLong} />
							</div>
							<div className='col-sm-2'>
								<label>Nature</label>
								<select className='form-control' id='naturePartenariat' ref={naturePartenariatRef} onChange={(e) => setNaturePartenariat(e.target.value)} value={naturePartenariat}>
									<option>--</option>
									{listeNaturePartenariat.map(res => (
										<option key={res.idNaturePartenariat} value={res.idNaturePartenariat}>{res.libelleNaturePartenariat}</option>
									))}
								</select>
							</div>
							<div className='col-sm-2'></div>
							<div className='col-sm-12'>&nbsp;</div>
							<div className='col-sm-10'>
								<label>Description</label>
								<textarea className='form-control' id='description' ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} value={description} ></textarea>
							</div>
							<div className='col-sm-2'>
								<label>&nbsp;<input type="hidden" id="idPartenariats" className='form-control' disabled /></label>
								<button className='btn btn-secondary btn-block btn-sup' id='btn-ajout'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des partenariats" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={[
									"DATE DEBUT", "DATE FIN", "LIBELLE PARTENARIAT COURTE", "LIBELLE PARTENARIAT LONGUE", "NATURE DU PARTENARIAT",
									{
										name: "",
										options: {
											customBodyRender: (value, tableMeta, updateValue) => {
												return (
													<div>
														<button className='btn btn-success' onClick={() => voir(value)} >
															<RemoveRedEye />
														</button>
														&nbsp;
														<button className='btn btn-warning' onClick={() => modifier(value)}>
															<Edit />
														</button>
														&nbsp;
														<button className='btn btn-danger' onClick={() => supprimer(value)}>
															<Delete />
														</button>
													</div>
												);
											}
										}
									}
								]}
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