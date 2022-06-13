import React, { useState, useEffect } from "react";


export default function Dashboard(props) {

	const [byNiveau, setByNiveau] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreEtudiantByNiveau")
			.then(res => res.json())
			.then(
				(data) => {
					setByNiveau(data.result);
				}
			)
	}, [])

	const [byTypeContrat, setByTypeContrat] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreEtudiantByTypeContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setByTypeContrat(data.result);
				}
			)
	}, [])

	const [byTypeFormation, setByTypeFormation] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreEtudiantByTypeFormation")
			.then(res => res.json())
			.then(
				(data) => {
					setByTypeFormation(data.result);
				}
			)
	}, [])

	return (
		<>
			<div className="row">
				<div className="col-sm-4">
					<div className="card">
						<div className="card-body">
							<h6 className="card-title"><b>NOMBRE D'ETUDIANT PAR NIVEAU</b></h6>
							<table className="table">
								<tbody>
									{byNiveau.map(res => (
										<tr key={res[0]+res[1]}>
											<td>{res[0]}</td>
											<td>{res[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<br/>
					<div className="card">
						<div className="card-body">
							<h6 className="card-title"><b>NOMBRE D'ETUDIANT PAR TYPE DE CONTRAT</b></h6>
							<table className="table">
								<tbody>
									{byTypeContrat.map(res => (
										<tr key={res[0]+res[1]}>
											<td>{res[0]}</td>
											<td>{res[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<br/>
					<div className="card">
						<div className="card-body">
							<h6 className="card-title"><b>NOMBRE D'ETUDIANT PAR TYPE DE FORMATION</b></h6>
							<table className="table">
								<tbody>
									{byTypeFormation.map(res => (
										<tr key={res[0]+res[1]}>
											<td>{res[0]}</td>
											<td>{res[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</>
	);
}