import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
  Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";
import axios from 'axios';

export default function Utilisateur(props) {
  var datatableData = [];

  const [login, setLogin] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/allLogin")
      .then(res => res.json())
      .then(
        (data) => {
          setLogin(data.result);
        }
      )
  }, [])

  login.forEach(function (item, i) {
    datatableData[i] = [item.user, item.accesModel.libelle]
  });

  const userRef = useRef();
  const passRef = useRef();
  const accesRef = useRef();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [acces, setAcces] = useState('');
  const [listeAcces, setListeAcces] = useState([]);
  const addAcces = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        'http://localhost:8080/addLogin',
        JSON.stringify(
          {
            "idLogin": 0,
            "user": user,
            "pass": pass,
            "accesModel": {
              "idAcces": acces
            }
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
  useEffect(() => {
    fetch("http://localhost:8080/allAcces")
      .then(res => res.json())
      .then(
        (data) => {
          setListeAcces(data.result);
        }
      )
  }, [])

  return (
    <>
      {localStorage.getItem('id_token') === "ADMIN" ? (
        <div>
          <PageTitle title="Ajouter un utilisateur" />
          <form onSubmit={addAcces}>
            <div className='row ajout-type-acces'>
              <div className='col-sm-3'>
                <input type='text' className='form-control' placeholder="Nom d'utilisateur" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
              </div>
              <div className='col-sm-3'>
                <input type='password' className='form-control' placeholder='Mot de passe' ref={passRef} onChange={(e) => setPass(e.target.value)} value={pass} required />
              </div>
              <div className='col-sm-3'>
                <select className='form-control' ref={accesRef} onChange={(e) => setAcces(e.target.value)} value={acces}>
                  <option>--Type d'accès--</option>
                  {listeAcces.map(res => (
                    <option key={res.idAcces} value={res.idAcces}>{res.libelle}</option>
                  ))}
                </select>
              </div>
              <div className='col-sm-3'>
                <button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
              </div>
            </div>
          </form>
          <br />
          <PageTitle title="Liste des utilisateurs" />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                data={datatableData}
                columns={["NOM D'UTILISATEUR", "NIVEAU D'ACCES"]}
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