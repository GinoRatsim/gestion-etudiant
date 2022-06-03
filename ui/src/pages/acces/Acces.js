import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
  Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';

export default function Acces(props) {
  var datatableData = [];

  const [login, setLogin] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/allAcces")
      .then(res => res.json())
      .then(
        (data) => {
          setLogin(data.result);
        }
      )
  }, [])

  login.forEach(function (item, i) {
    datatableData[i] = [item.code, item.libelle]
  });

  const libelleRef = useRef();
  const codeRef = useRef();
  const [libelle, setLibelle] = useState('');
  const [code, setCode] = useState('');
  const addAcces = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        'http://localhost:8080/addAcces',
        JSON.stringify(
          {
            "idAcces": 0,
            "code": code,
            "libelle": libelle
          }
        ),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      window.location.reload(false);
    }
    catch (err) {

    }
  }

  return (
    <>
      {localStorage.getItem('id_token') === "ADMIN" ? (
        <div>
          <PageTitle title="Ajouter un type d'accès" />
          <form onSubmit={addAcces}>
            <div className='row ajout-type-acces'>
              <div className='col-sm-4'>
                <input type='text' className='form-control' placeholder='Code' ref={codeRef} onChange={(e) => setCode(e.target.value)} value={code} required />
              </div>
              <div className='col-sm-4'>
                <input type='text' className='form-control' placeholder='Libellé' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
              </div>
              <div className='col-sm-4'>
                <button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
              </div>
            </div>
          </form>
          <br />
          <PageTitle title="Liste des types d'accès des utilisateurs" />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                data={datatableData}
                columns={["Code", "Libellé"]}
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