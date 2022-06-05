import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Utilisateur from "../../pages/utilisateur";
import Acces from "../../pages/acces";
import Etudiant from "../../pages/etudiant";
import CoursIntervenant from "../../pages/coursIntervenant/CoursIntervenant";
import Niveau from "../../pages/niveau";
import Campus from "../../pages/campus";
import Module from "../../pages/module";
import Specialite from "../../pages/specialite";
import TypeContrat from "../../pages/typeContrat";
import TypeFormation from "../../pages/typeFormation";
import PlanificationCours from "../../pages/planificationCours";
import NaturePartenariat from "../../pages/naturePartenariat";
import Partenariat from "../../pages/partenariat";
import Groupe from "../../pages/groupe";
import Entreprise from "../../pages/entreprise";
import ModSpec from "../../pages/moduleSpecialite";
import Contrat from "../../pages/contrat";
import OffresPro from "../../pages/offresPro";
import ListeEtudiant from "../../pages/directionAcademique/listeEtudiant";
import FicheEtudiant from "../../pages/ficheEtudiant";
import ListeCoursIntervenants from "../../pages/directionAcademique/listeCoursIntervenants";
import ListeEtudiantRattrapage from "../../pages/listeEtudiantRattrapage";
import GestionMemoire from "../../pages/gestionMemoire";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/utilisateur" component={Utilisateur} />
            <Route path="/app/acces" component={Acces} />
            <Route path="/app/etudiant" component={Etudiant} />
            <Route path="/app/coursIntervenant" component={CoursIntervenant} />
            <Route path="/app/niveau" component={Niveau} />
            <Route path="/app/campus" component={Campus} />
            <Route path="/app/module" component={Module} />
            <Route path="/app/specialite" component={Specialite} />
            <Route path="/app/typeContrat" component={TypeContrat} />
            <Route path="/app/typeFormation" component={TypeFormation} />
            <Route path="/app/planificationCours" component={PlanificationCours} />
            <Route path="/app/naturePartenariat" component={NaturePartenariat} />
            <Route path="/app/Partenariat" component={Partenariat} />
            <Route path="/app/groupe" component={Groupe} />
            <Route path="/app/entreprise" component={Entreprise} />
            <Route path="/app/modSpec" component={ModSpec} />
            <Route path="/app/contrat" component={Contrat} />
            <Route path="/app/offresPro" component={OffresPro} />
            <Route path="/app/listeEtudiant" component={ListeEtudiant} />
            <Route path="/app/ficheEtudiant/:id" component={FicheEtudiant} />
            <Route path="/app/listeCoursIntervenants" component={ListeCoursIntervenants} />
            <Route path="/app/listeEtudiantRattrapage" component={ListeEtudiantRattrapage} />
            <Route path="/app/gestionMemoire" component={GestionMemoire} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
