import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home,
  ArrowBack,
  SupervisedUserCircle,
  VpnKey
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
    { id: 1, label: "Utilisateur", link: "/app/utilisateur", icon: <SupervisedUserCircle /> },
    { id: 2, label: "Accès", link: "/app/acces", icon: <VpnKey /> },
  ];
}

if (localStorage.getItem('id_token') === "DA") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
    { id: 1, label: "Etudiants", link: "/app/etudiant", icon: <SupervisedUserCircle /> },
    { id: 2, label: "Liste des cours et intervenants", link: "/app/coursIntervenant", icon: <SupervisedUserCircle /> },
    { id: 3, label: "Liste des niveaux", link: "/app/niveau", icon: <SupervisedUserCircle /> },
    { id: 4, label: "Liste des campus", link: "/app/campus", icon: <SupervisedUserCircle /> },
  ];
}

if (localStorage.getItem('id_token') === "P") {
  structure = [
    { id: 0, label: "Accueil", link: "/app/dashboard", icon: <Home /> },
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
