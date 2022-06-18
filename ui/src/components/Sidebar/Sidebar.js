import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home,
  ArrowBack
} from "@material-ui/icons";
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
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
    { id: 1, label: "Utilisateurs", link: "/app/utilisateur", icon: <Home /> },
    { id: 2, label: "Accès", link: "/app/acces", icon: <Home /> },
    { id: 3, label: "Niveaux", link: "/app/niveau", icon: <Home /> },
    { id: 4, label: "Cours", link: "/app/module", icon: <Home /> },
    { id: 5, label: "Spécialités", link: "/app/specialite", icon: <Home /> },
    { id: 6, label: "Types de contrat", link: "/app/typeContrat", icon: <Home /> },
    { id: 7, label: "Types de formation", link: "/app/typeFormation", icon: <Home /> },
    { id: 8, label: "Planification", link: "/app/planificationCours", icon: <Home /> },
    { id: 9, label: "Types de partenariat", link: "/app/naturePartenariat", icon: <Home /> },
    { id: 10, label: "Partenariats", link: "/app/partenariat", icon: <Home /> },
    { id: 11, label: "Groupes", link: "/app/groupe", icon: <Home /> },
    { id: 12, label: "Entreprise", link: "/app/entreprise", icon: <Home /> },
    { id: 13, label: "Modules & spécialités", link: "/app/modSpec", icon: <Home /> },
    { id: 14, label: "Campus", link: "/app/campus", icon: <Home /> },
    { id: 15, label: "Etudiants", link: "/app/etudiant", icon: <Home /> },
    { id: 16, label: "Contrats", link: "/app/contrat", icon: <Home /> },
    { id: 17, label: "Offres pro", link: "/app/offresPro", icon: <Home /> },
    { id: 18, label: "Mémoires de fin de cycle", link: "/app/gestionMemoire", icon: <Home /> },
    { id: 19, label: "Anciens étudiants", link: "/app/suiviAnciens", icon: <Home /> },
    { id: 20, label: "Suivi des absences", link: "/app/suiviAbsences", icon: <Home /> },
    { id: 21, label: "Suivi comptable", link: "/app/suiviComptable", icon: <Home /> },
    { id: 22, label: "Etudiants admis/recalés", link: "/app/admisRecales", icon: <Home /> },
    { id: 23, label: "Intervenants", link: "/app/intervenant", icon: <Home /> },
    { id: 24, label: "Personne & Intervenants", link: "/app/personneIntervenant", icon: <Home /> },
    { id: 25, label: "Groupe & module", link: "/app/groupeModule", icon: <Home /> },
    { id: 26, label: "Administratif étudiant", link: "/app/administratifEtudiant", icon: <Home /> },
    { id: 27, label: "Type SCT", link: "/app/typeSCT", icon: <Home /> },
    { id: 28, label: "SCT étudiant", link: "/app/sctEtudiant", icon: <Home /> },
  ];
}

if (localStorage.getItem('id_token') === "DA") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
    { id: 1, label: "Liste des étudiants", link: "/app/listeEtudiant", icon: <Home /> },
    { id: 2, label: "Liste des cours & intervenants", link: "/app/listeCoursIntervenants", icon: <Home /> },
    { id: 3, label: "Liste des étudiants pour les rattrapages", link: "/app/listeEtudiantRattrapage", icon: <Home /> },
    { id: 4, label: "Liste des anciens étudiants", link: "/app/suiviAnciens", icon: <Home /> },
    { id: 5, label: "Gestion des mémoires de fin de cycle", link: "/app/gestionMemoire", icon: <Home /> },
    { id: 6, label: "Gestion des partenariats", link: "/app/partenariat", icon: <Home /> },
    { id: 7, label: "Etudiants admis/recalés", link: "/app/admisRecales", icon: <Home /> },
  ];
}

if (localStorage.getItem('id_token') === "P") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
    { id: 1, label: "Gestion des planifications", link: "/app/planificationCours", icon: <Home /> },
    { id: 2, label: "Etudiants", link: "/app/listeEtudiant", icon: <Home /> },
    { id: 3, label: "Etudiants pour les rattrapages", link: "/app/listeEtudiantRattrapage", icon: <Home /> },
    { id: 4, label: "Entreprise : alternants/stages", link: "/app/entrepriseAltStage", icon: <Home /> },
    { id: 5, label: "Gestion des offres pro", link: "/app/offresPro", icon: <Home /> },
    { id: 6, label: "Envoi des mail par promo", link: "/app/envoiMailPromo", icon: <Home /> },
    { id: 7, label: "Gestion des suivi des absences", link: "/app/suiviAbsences", icon: <Home /> },
    { id: 8, label: "SCT étudiant", link: "/app/sctEtudiant", icon: <Home /> },
  ];
}

if (localStorage.getItem('id_token') === "ADM") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
  ];
}

if (localStorage.getItem('id_token') === "E") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
    { id: 1, label: "Liste des cours", link: "/app/module", icon: <Home /> },
    { id: 2, label: "Liste des offres pro", link: "/app/offresPro", icon: <Home /> },
    { id: 3, label: "Liste des rattrapages", link: "/app/planificationCours", icon: <Home /> },
    { id: 4, label: "Liste des cours & intervenants", link: "/app/listeCoursIntervenants", icon: <Home /> },
    { id: 5, label: "Fiche d'étudiant", link: "/app/ficheEtudiant/" + localStorage.getItem('idEtudiant'), icon: <Home /> },
    { id: 6, label: "Situation comptable", link: "/app/situationComptable", icon: <Home /> },
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

  useEffect(function () {
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
