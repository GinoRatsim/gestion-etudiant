import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
  Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function Etudiant(props) {

  Moment.locale('fr');

  var datatableData = [];
  var datatableDataEtudiantRattrapages = [];

  const [donnee, setDonnee] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/allEtudiant")
      .then(res => res.json())
      .then(
        (data) => {
          setDonnee(data.result);
        }
      )
  }, [])
  donnee.forEach(function (item, i) {
    datatableData[i] = [item.personne.nom, item.personne.prenoms, item.specialite.libelleSpecialite, item.typeFormation.libelleTypeFormation, item.contrat.typeContrat.libelleTypeContrat, item.creditTotalObtenus, item.niveau.libelleNiveau]
  });

  const [etudiantRattrapages, setEtudiantRattrapages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/allNotes")
      .then(res => res.json())
      .then(
        (data) => {
          setEtudiantRattrapages(data.result);
        }
      )
  }, [])
  etudiantRattrapages.forEach(function (item, i) {
    if (item.notes >= 10) {
      datatableDataEtudiantRattrapages[i] = [item.etudiant.personne.nom, item.etudiant.personne.prenoms, item.etudiant.typeFormation.libelleTypeFormation, item.etudiant.contrat.typeContrat.libelleTypeContrat, item.module.niveau.libelleNiveau, item.notes, item.notes>10 ? 'Admis' : 'Recalés', item.module.libelleModule]
    }
  });

  return (
    <>
      {localStorage.getItem('id_token') === "DA" ? (
        <div>
          <div>
            <div className='row'>
              <div className='col-sm-12'>
                <PageTitle title="Liste des étudiants avec crédits" />
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <MUIDataTable
                      data={datatableData}
                      columns={["NOM", "PRENOM", "SPECIALITE", "TYPE DE FORMATION", "TYPE DE CONTRAT", "CREDIT OBTENUS", "NIVEAU"]}
                      options={{
                        selectableRows: 'none'
                      }}
                    />
                  </Grid>
                </Grid>
                <PageTitle title="Liste des étudiants admis/recalés" />
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <MUIDataTable
                      data={datatableDataEtudiantRattrapages}
                      columns={["NOM", "PRENOM", "TYPE DE FORMATION", "TYPE DE CONTRAT", "NIVEAU", "NOTES", "SITUATION", "MODULE"]}
                      options={{
                        selectableRows: 'none'
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={{ pathname: "/app/dashboard" }} />
      )}
    </>
  );
}