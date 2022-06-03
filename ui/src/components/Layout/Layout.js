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
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
