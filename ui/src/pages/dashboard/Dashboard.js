import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Sector,
	Tooltip,
	XAxis,
	YAxis,
	Cell,
} from "recharts";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";

export default function Charts(props) {

	var classes = useStyles();
	var theme = useTheme();
	// local
	var [activeIndex, setActiveIndexId] = useState(0);
	var [activeIndex1, setActiveIndexId1] = useState(0);
	var [activeIndex2, setActiveIndexId2] = useState(0);


	var datatableDataNiveau = [];
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
	byNiveau.forEach(function(item, i) {
		datatableDataNiveau[i] = { name: item[0] + " - " + item[1], value: item[2] }
	});

	var datatableDataTypeContrat = [];
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
	byTypeContrat.forEach(function(item, i) {
		datatableDataTypeContrat[i] = { name: item[0], value: item[1] }
	});

	var datatableDataTypeFormation = [];
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
	var color = ["primary", "success", "warning", "info", "secondary"];
	byTypeFormation.forEach(function(item, i) {
		datatableDataTypeFormation[i] = { name: item[0], value: item[1], color: color[i] }
	});

	var colorCampus = ["secondary", "info", "warning", "success", "primary"];
	var datatableDataCampus = [];
	const [byCampus, setByCampus] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreEtudiantByCampus")
			.then(res => res.json())
			.then(
				(data) => {
					setByCampus(data.result);
				}
			)
	}, [])
	byCampus.forEach(function(item, i) {
		datatableDataCampus[i] = { name: item[1], value: item[2], color: colorCampus[i] }
	});

	var colorSpecialite = ["info", "warning", "success", "primary", "secondary"];
	var datatableDataSpecialite = [];
	const [bySpecialite, setBySpecialite] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreEtudiantBySpecialite")
			.then(res => res.json())
			.then(
				(data) => {
					setBySpecialite(data.result);
				}
			)
	}, [])
	bySpecialite.forEach(function(item, i) {
		datatableDataSpecialite[i] = { name: item[1], value: item[2], color: colorSpecialite[i] }
	});

	var colorAnciens = ["warning", "primary", "info", "success", "secondary"];
	var datatableDataAnciens = [];
	const [byAnciens, setByAnciens] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/nombreAnciensByTypeContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setByAnciens(data.result);
				}
			)
	}, [])
	byAnciens.forEach(function(item, i) {
		datatableDataAnciens[i] = { name: item[0], value: item[1], color: colorAnciens[i] }
	});

	const [reussite, setReussite] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/getTauxReussite")
			.then(res => res.json())
			.then(
				(data) => {
					setReussite(data.result);
				}
			)
	}, [])
	
	const [echec, setEchec] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/getTauxEchec")
			.then(res => res.json())
			.then(
				(data) => {
					setEchec(data.result);
				}
			)
	}, [])

	const tauxReussite = [
		{
			name: "",
			L1: 0,
			L2: 0,
			L3: 0,
			M1: 0,
			M2: 0
		}
	];
	const tauxEchec = [
		{
			name: "",
			L1: 0,
			L2: 0,
			L3: 0,
			M1: 0,
			M2: 0
		}
	];

	reussite.forEach(function(item, i) {
		var annee = reussite[i].anneeScolaire;
		var L1 = 0;
		var L2 = 0;
		var L3 = 0;
		var M1 = 0;
		var M2 = 0;
		
		if(reussite[i].l1){
			L1 = reussite[i].l1[2] * 100 / reussite[i].l1[1]
		}
		if(reussite[i].l2){
			L2 = reussite[i].l2[2] * 100 / reussite[i].l2[1]
		}
		if(reussite[i].l3){
			L3 = reussite[i].l3[2] * 100 / reussite[i].l3[1]
		}
		if(reussite[i].m1){
			M1 = reussite[i].m1[2] * 100 / reussite[i].m1[1]
		}
		if(reussite[i].m2){
			M2 = reussite[i].m2[2] * 100 / reussite[i].m2[1]
		}
		
		tauxReussite[i + 1] = {
			name: annee,
			L1: L1,
			L2: L2,
			L3: L3,
			M1: M1,
			M2: M2
		}
	});
	
	echec.forEach(function(item, i) {
		var annee = echec[i].anneeScolaire;
		var L1 = 0;
		var L2 = 0;
		var L3 = 0;
		var M1 = 0;
		var M2 = 0;
		
		if(echec[i].l1){
			L1 = echec[i].l1[2] * 100 / echec[i].l1[1]
		}
		if(echec[i].l2){
			L2 = echec[i].l2[2] * 100 / echec[i].l2[1]
		}
		if(echec[i].l3){
			L3 = echec[i].l3[2] * 100 / echec[i].l3[1]
		}
		if(echec[i].m1){
			M1 = echec[i].m1[2] * 100 / echec[i].m1[1]
		}
		if(echec[i].m2){
			M2 = echec[i].m2[2] * 100 / echec[i].m2[1]
		}
		
		tauxEchec[i + 1] = {
			name: annee,
			L1: L1,
			L2: L2,
			L3: L3,
			M1: M1,
			M2: M2
		}
	});

	return (
		<>
			<div className="row">
				<div className="col-sm-12">
					<PageTitle title="TABLEAU DE BORD" />
				</div>
			</div>

			<div className="row dash">
				<div className="col-sm-4">
					<Widget title="ETUDIANTS PAR TYPE DE FORMATION" upperTitle className={classes.card}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<ResponsiveContainer width="100%" height={144}>
									<PieChart>
										<Pie
											data={datatableDataTypeFormation}
											innerRadius={30}
											outerRadius={40}
											dataKey="value"
										>
											{datatableDataTypeFormation.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={theme.palette[entry.color].main}
												/>
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
							</Grid>
							<Grid item xs={6}>
								<div className={classes.pieChartLegendWrapper}>
									{datatableDataTypeFormation.map(({ name, value, color }, index) => (
										<div key={color} className={classes.legendItemContainer}>
											<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
												&nbsp;{name}&nbsp;
											</Typography>
											<Typography color="text" colorBrightness="secondary">
												&nbsp;{value}
											</Typography>
											&nbsp;
											<Dot color={color} />
										</div>
									))}
								</div>
							</Grid>
						</Grid>
					</Widget>
				</div>
				<div className="col-sm-4">
					<Widget title="ETUDIANTS PAR CAMPUS" upperTitle className={classes.card}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<ResponsiveContainer width="100%" height={144}>
									<PieChart>
										<Pie
											data={datatableDataCampus}
											innerRadius={30}
											outerRadius={40}
											dataKey="value"
										>
											{datatableDataCampus.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={theme.palette[entry.color].main}
												/>
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
							</Grid>
							<Grid item xs={6}>
								<div className={classes.pieChartLegendWrapper}>
									{datatableDataCampus.map(({ name, value, color }, index) => (
										<div key={color} className={classes.legendItemContainer}>

											<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
												&nbsp;{name}&nbsp;
											</Typography>
											<Typography color="text" colorBrightness="secondary">
												&nbsp;{value}
											</Typography>
											&nbsp;
											<Dot color={color} />
										</div>
									))}
								</div>
							</Grid>
						</Grid>
					</Widget>
				</div>
				<div className="col-sm-4">
					<Widget title="ETUDIANTS ANCIENS" upperTitle className={classes.card}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<ResponsiveContainer width="100%" height={144}>
									<PieChart>
										<Pie
											data={datatableDataAnciens}
											innerRadius={30}
											outerRadius={40}
											dataKey="value"
										>
											{datatableDataAnciens.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={theme.palette[entry.color].main}
												/>
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
							</Grid>
							<Grid item xs={6}>
								<div className={classes.pieChartLegendWrapper}>
									{datatableDataAnciens.map(({ name, value, color }, index) => (
										<div key={color} className={classes.legendItemContainer}>

											<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
												&nbsp;{name}&nbsp;
											</Typography>
											<Typography color="text" colorBrightness="secondary">
												&nbsp;{value}
											</Typography>
											&nbsp;
											<Dot color={color} />
										</div>
									))}
								</div>
							</Grid>
						</Grid>
					</Widget>
				</div>
			</div>

			<div className="row dash">
				<div className="col-sm-12">&nbsp;</div>
			</div>

			<div className="row dash">
				<div className="col-sm-4">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Widget title="ETUDIANTS PAR NIVEAU">
								<ResponsiveContainer width="100%" height={350}>
									<PieChart width={200} height={350}>
										<Pie
											activeIndex={activeIndex}
											activeShape={renderActiveShape}
											data={datatableDataNiveau}
											innerRadius={110}
											outerRadius={125}
											fill={theme.palette.info.main}
											dataKey="value"
											onMouseEnter={(e, id) => setActiveIndexId(id)}
										/>
									</PieChart>
								</ResponsiveContainer>
							</Widget>
						</Grid>
					</Grid>
				</div>
				<div className="col-sm-4">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Widget title="ETUDIANTS PAR SPECIALITE">
								<ResponsiveContainer width="100%" height={350}>
									<PieChart width={200} height={350}>
										<Pie
											activeIndex={activeIndex2}
											activeShape={renderActiveShape}
											data={datatableDataSpecialite}
											innerRadius={110}
											outerRadius={125}
											fill={theme.palette.warning.main}
											dataKey="value"
											onMouseEnter={(e, id) => setActiveIndexId2(id)}
										/>
									</PieChart>
								</ResponsiveContainer>
							</Widget>
						</Grid>
					</Grid>
				</div>

				<div className="col-sm-4">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Widget title="ETUDIANTS PAR TYPE DE CONTRAT">
								<ResponsiveContainer width="100%" height={350}>
									<PieChart width={200} height={350}>
										<Pie
											activeIndex={activeIndex1}
											activeShape={renderActiveShape}
											data={datatableDataTypeContrat}
											innerRadius={110}
											outerRadius={125}
											fill={theme.palette.success.main}
											dataKey="value"
											onMouseEnter={(e, id) => setActiveIndexId1(id)}
										/>
									</PieChart>
								</ResponsiveContainer>
							</Widget>
						</Grid>
					</Grid>
				</div>
			</div>

			<div className="row dash">
				<div className="col-sm-12">&nbsp;</div>
			</div>

			<div className="row dash">
				<div className="col-sm-6">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Widget title="Taux de réussite par année scolaire" upperTitle>
								<ResponsiveContainer width="100%" height={350}>
									<LineChart
										width={500}
										height={300}
										data={tauxReussite}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line
											type="monotone"
											dataKey="L1"
											stroke={theme.palette.primary.main}
										/>
										<Line
											type="monotone"
											dataKey="L2"
											stroke={theme.palette.secondary.main}
										/>
										<Line
											type="monotone"
											dataKey="L3"
											stroke={theme.palette.success.main}
										/>
										<Line
											type="monotone"
											dataKey="M1"
											stroke={theme.palette.warning.main}
										/>
										<Line
											type="monotone"
											dataKey="M2"
											stroke={theme.palette.info.main}
										/>
									</LineChart>
								</ResponsiveContainer>
							</Widget>
						</Grid>
					</Grid>
				</div>
				<div className="col-sm-6">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Widget title="Taux d'échec par année scolaire" upperTitle>
								<ResponsiveContainer width="100%" height={350}>
									<LineChart
										width={500}
										height={300}
										data={tauxEchec}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line
											type="monotone"
											dataKey="L1"
											stroke={theme.palette.primary.main}
										/>
										<Line
											type="monotone"
											dataKey="L2"
											stroke={theme.palette.secondary.main}
										/>
										<Line
											type="monotone"
											dataKey="L3"
											stroke={theme.palette.success.main}
										/>
										<Line
											type="monotone"
											dataKey="M1"
											stroke={theme.palette.warning.main}
										/>
										<Line
											type="monotone"
											dataKey="M2"
											stroke={theme.palette.info.main}
										/>
									</LineChart>
								</ResponsiveContainer>
							</Widget>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
}

// ################################################################

function renderActiveShape(props) {
	var RADIAN = Math.PI / 180;
	var {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	var sin = Math.sin(-RADIAN * midAngle);
	var cos = Math.cos(-RADIAN * midAngle);
	var sx = cx + (outerRadius + 10) * cos;
	var sy = cy + (outerRadius + 10) * sin;
	var mx = cx + (outerRadius + 30) * cos;
	var my = cy + (outerRadius + 30) * sin;
	var ex = mx + (cos >= 0 ? 1 : -1) * 22;
	var ey = my;
	var textAnchor = cos >= 0 ? "start" : "end";

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333"
			>{`Total : ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="#999"
			>
				{`${(percent * 100).toFixed(2)}%`}
			</text>
		</g>
	);
}
