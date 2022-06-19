import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
	ArrowBack
} from "@material-ui/icons";
import {
	FaHome,
	FaUser,
	FaUsersCog,
	FaSignInAlt,
	FaLevelUpAlt,
	FaBook,
	FaUserGraduate,
	FaFileContract,
	FaSwatchbook,
	FaCalendarAlt,
	FaUserFriends,
	FaBusinessTime,
	FaUsers,
	FaLandmark,
	FaSchool,
	FaFileSignature,
	FaFileInvoiceDollar,
	FaOutdent,
	FaCalendarTimes,
	FaUserCheck,
	FaChalkboardTeacher,
	FaBookReader,
	FaUserShield,
	FaUndoAlt,
	FaUserPlus,
	FaSuitcase,
	FaEnvelope,
	FaCalculator,
	FaFileInvoice,
	FaSuitcaseRolling,
	FaUserSecret,
	FaObjectUngroup,
	FaWrench
} from 'react-icons/fa';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "../../context/LayoutContext";

var structure = [];

if (localStorage.getItem('id_token') === "ADMIN") {
	structure = [
		{ id: 0, label: "Accueil", link: "/app/dashboard", icon: <FaHome /> },
		{ id: 1, label: "Utilisateurs", link: "/app/utilisateur", icon: <FaUsersCog /> },
		{ id: 2, label: "Accès et mot de passe", link: "/app/acces", icon: <FaSignInAlt /> },
		{ id: 3, label: "Niveaux de formations", link: "/app/niveau", icon: <FaLevelUpAlt /> },
		{ id: 4, label: "Modules", link: "/app/module", icon: <FaBook /> },
		{ id: 5, label: "Spécialités", link: "/app/specialite", icon: <FaUserShield /> },
		{ id: 6, label: "Type de contrat", link: "/app/typeContrat", icon: <FaFileContract /> },
		{ id: 7, label: "Type de formation", link: "/app/typeFormation", icon: <FaSwatchbook /> },
		{ id: 8, label: "Planning de cours", link: "/app/planificationCours", icon: <FaCalendarAlt /> },
		{ id: 9, label: "Type de partenariat", link: "/app/naturePartenariat", icon: <FaUserFriends /> },
		{ id: 10, label: "Partenariats", link: "/app/partenariat", icon: <FaBusinessTime /> },
		{ id: 11, label: "Gestion des groupes", link: "/app/groupe", icon: <FaUsers /> },
		{ id: 12, label: "Entreprises", link: "/app/entreprise", icon: <FaLandmark /> },
		{ id: 13, label: "Modules & spécialités", link: "/app/modSpec", icon: <FaBook /> },
		{ id: 14, label: "Campus", link: "/app/campus", icon: <FaSchool /> },
		{ id: 15, label: "Etudiants", link: "/app/etudiant", icon: <FaUserPlus /> },
		{ id: 16, label: "Contrats", link: "/app/contrat", icon: <FaFileSignature /> },
		{ id: 17, label: "Offres professionnelles", link: "/app/offresPro", icon: <FaFileInvoiceDollar /> },
		{ id: 18, label: "Mémoires de fin de cycle", link: "/app/gestionMemoire", icon: <FaBook /> },
		{ id: 19, label: "Anciens étudiants", link: "/app/suiviAnciens", icon: <FaOutdent /> },
		{ id: 20, label: "Gestion des suivi des absences", link: "/app/suiviAbsences", icon: <FaCalendarTimes /> },
		{ id: 21, label: "Comptabilité", link: "/app/suiviComptable", icon: <FaCalculator /> },
		{ id: 22, label: "Etudiants admis/recalés", link: "/app/admisRecales", icon: <FaUserCheck /> },
		{ id: 23, label: "Intervenants", link: "/app/intervenant", icon: <FaUser /> },
		{ id: 24, label: "Personne & Intervenants", link: "/app/personneIntervenant", icon: <FaUserSecret /> },
		{ id: 25, label: "Groupe & module", link: "/app/groupeModule", icon: <FaObjectUngroup /> },
		{ id: 26, label: "Administratif étudiant", link: "/app/administratifEtudiant", icon: <FaWrench /> },
		{ id: 27, label: "Type SCT", link: "/app/typeSCT", icon: <FaSuitcase /> },
		{ id: 28, label: "SCT étudiant", link: "/app/sctEtudiant", icon: <FaSuitcaseRolling /> },
	];
}

if (localStorage.getItem('id_token') === "DA") {
	structure = [
		{ id: 0, label: "Accueil", link: "/app/dashboard", icon: <FaHome /> },
		{ id: 1, label: "Etudiants", link: "/app/listeEtudiant", icon: <FaUserPlus /> },
		{ id: 2, label: "Liste des cours & intervenants", link: "/app/listeCoursIntervenants", icon: <FaChalkboardTeacher /> },
		{ id: 3, label: "Rattrapages", link: "/app/listeEtudiantRattrapage", icon: <FaUndoAlt /> },
		{ id: 4, label: "Anciens étudiants", link: "/app/suiviAnciens", icon: <FaUserGraduate /> },
		{ id: 5, label: "Mémoires de fin de cycle", link: "/app/gestionMemoire", icon: <FaBookReader /> },
		{ id: 6, label: "Partenariats", link: "/app/partenariat", icon: <FaBusinessTime /> },
		{ id: 7, label: "Etudiants admis/recalés", link: "/app/admisRecales", icon: <FaUserCheck /> },
	];
}

if (localStorage.getItem('id_token') === "P") {
	structure = [
		{ id: 0, label: "Accueil", link: "/app/dashboard", icon: <FaHome /> },
		{ id: 1, label: "Planning de cours", link: "/app/planificationCours", icon: <FaCalendarAlt /> },
		{ id: 2, label: "Etudiants", link: "/app/listeEtudiant", icon: <FaUserPlus /> },
		{ id: 3, label: "Rattrapages", link: "/app/listeEtudiantRattrapage", icon: <FaUndoAlt /> },
		{ id: 4, label: "Alternance/stage", link: "/app/entrepriseAltStage", icon: <FaSuitcase /> },
		{ id: 5, label: "Offres professionnelles", link: "/app/offresPro", icon: <FaFileInvoiceDollar /> },
		{ id: 6, label: "Envoi des mail par promo", link: "/app/envoiMailPromo", icon: <FaEnvelope /> },
		{ id: 7, label: "Gestion des suivi des absences", link: "/app/suiviAbsences", icon: <FaCalendarTimes /> },
		{ id: 8, label: "SCT étudiant", link: "/app/sctEtudiant", icon: <FaSuitcaseRolling /> },
	];
}

if (localStorage.getItem('id_token') === "ADM") {
	structure = [
		{ id: 0, label: "Accueil", link: "/app/dashboard", icon: <FaHome /> },
		{ id: 1, label: "Suivi comptabilité", link: "/app/suiviComptable", icon: <FaCalculator /> }
	];
}

if (localStorage.getItem('id_token') === "E") {
	structure = [
		{ id: 0, label: "Accueil", link: "/app/dashboard", icon: <FaHome /> },
		{ id: 1, label: "Modules", link: "/app/module", icon: <FaBook /> },
		{ id: 2, label: "Offres professionnelles", link: "/app/offresPro", icon: <FaFileInvoiceDollar /> },
		{ id: 3, label: "Cours & Rattrapages", link: "/app/planificationCours", icon: <FaUndoAlt /> },
		{ id: 4, label: "Liste des cours & intervenants", link: "/app/listeCoursIntervenants", icon: <FaChalkboardTeacher /> },
		{ id: 5, label: "Fiche d'étudiant", link: "/app/ficheEtudiant/" + localStorage.getItem('idEtudiant'), icon: <FaFileInvoice /> },
		{ id: 6, label: "Situation comptable", link: "/app/situationComptable", icon: <FaCalculator /> },
	];
}

function Sidebar({ location }) {
	var classes = useStyles();
	var theme = useTheme();

	// global
	var { isSidebarOpened } = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	// local
	var [isPermanent, setPermanent] = useState(true);

	useEffect(function() {
		window.addEventListener("resize", handleWindowWidthChange);
		handleWindowWidthChange();
		return function cleanup() {
			window.removeEventListener("resize", handleWindowWidthChange);
		};
	});

	return (
		<Drawer
			variant={isPermanent ? "permanent" : "temporary"}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened,
				}),
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBack
						classes={{
							root: classNames(classes.headerIcon, classes.headerIconCollapse),
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{structure.map(link => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
			</List>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		var windowWidth = window.innerWidth;
		var breakpointWidth = theme.breakpoints.values.md;
		var isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
