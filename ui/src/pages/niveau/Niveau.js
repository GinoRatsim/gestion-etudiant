import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
    Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle/PageTitle";
import Moment from 'moment';

export default function Niveau(props) {

    Moment.locale('fr');

    var datatableData = [];

    const [donnee, setDonnee] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/allNiveau")
            .then(res => res.json())
            .then(
                (data) => {
                    setDonnee(data.result);
                }
            )
    }, [])
    donnee.forEach(function (item, i) {
        datatableData[i] = [item.codeNiveau, item.libelleNiveau]
    });

    return (
        <>
            {localStorage.getItem('id_token') === "DA" ? (
                <div>
                    <div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <PageTitle title="Liste des niveaux" />
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <MUIDataTable
                                            data={datatableData}
                                            columns={["CODE", "LIBELLE"]}
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