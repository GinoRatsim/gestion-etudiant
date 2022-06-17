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
    { id: 1, label: "Gestion des utilisateurs", link: "/app/utilisateur", icon: <Home /> },
    { id: 2, label: "Gestion des accès", link: "/app/acces", icon: <Home /> },
    { id: 3, label: "Gestion des niveaux", link: "/app/niveau", icon: <Home /> },
    { id: 4, label: "Gestion des cours", link: "/app/module", icon: <Home /> },
    { id: 5, label: "Gestion des spécialités", link: "/app/specialite", icon: <Home /> },
    { id: 6, label: "Gestion des types de contrat", link: "/app/typeContrat", icon: <Home /> },
    { id: 7, label: "Gestion des types de formation", link: "/app/typeFormation", icon: <Home /> },
    { id: 8, label: "Gestion de planification", link: "/app/planificationCours", icon: <Home /> },
    { id: 9, label: "Gestion des types de partenariat", link: "/app/naturePartenariat", icon: <Home /> },
    { id: 10, label: "Gestion des partenariats", link: "/app/partenariat", icon: <Home /> },
    { id: 11, label: "Gestion des groupes", link: "/app/groupe", icon: <Home /> },
    { id: 12, label: "Gestion des entreprise", link: "/app/entreprise", icon: <Home /> },
    { id: 13, label: "Gestion des modules & spécialités", link: "/app/modSpec", icon: <Home /> },
    { id: 14, label: "Gestion des campus", link: "/app/campus", icon: <Home /> },
    { id: 15, label: "Gestion des étudiants", link: "/app/etudiant", icon: <Home /> },
    { id: 16, label: "Gestion des contrats", link: "/app/contrat", icon: <Home /> },
    { id: 17, label: "Gestion des offres pro", link: "/app/offresPro", icon: <Home /> },
    { id: 18, label: "Gestion des mémoires de fin de cycle", link: "/app/gestionMemoire", icon: <Home /> },
    { id: 19, label: "Liste des anciens étudiants", link: "/app/suiviAnciens", icon: <Home /> },
    { id: 20, label: "Gestion des suivi des absences", link: "/app/suiviAbsences", icon: <Home /> },
    { id: 20, label: "Suivi comptable", link: "/app/suiviComptable", icon: <Home /> },
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
    { id: 5, label: "Fiche d'étudiant", link: "/app/ficheEtudiant/" + localStorage.getItem('idPersonne'), icon: <Home /> },
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
