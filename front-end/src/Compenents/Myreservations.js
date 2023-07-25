import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import {Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import axios from "axios"

export default function Myreservations()
    { 
        const [Reservations, setReservations] = useState([]);
        const { IdCl } = useParams();
        const [IdCl1, setIdCl1] = useState(IdCl);
        // featch all users
        async function GetReservations() {
            
            const url = `http://localhost:4000/MyreservationsCl/${IdCl1}`;
            const res = await axios.get(url);
            setReservations(res.data);
        }
        // featch all users
        useEffect(() => {
            GetReservations();
        }, []);
        async function Deletereservation(IdRes) {
            const url = `http://localhost:4000/MyreservationsCl/${IdRes}`;
            const req = await axios.delete(url);
            GetReservations();
            
          }
        return(
          <div class="container-scroller">
              <NavBar1 IdCl={IdCl}/>
              <div class="container-fluid page-body-wrapper">
                <NavBar2 IdCl={IdCl}/>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                    <div class="col-12 grid-margin stretch-card">
                        <div class="card">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Striped Table</h4>
                                <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th> Numero Chambr </th>
                                        <th> Date Reservation </th>
                                        <th> Date Debut </th>
                                        <th> Nmbr Nuits </th>
                                        <th> Prix Total </th>
                                        <th> Actions</th>
                                    </tr>
                                    </thead>
                                    {Reservations&&
                                        Reservations.map((reservation) => {
                                            return(
                                                <tbody>
                                                <tr>
                                                    <td> {reservation.NumChambr} </td>
                                                    <td> {reservation.DateRes} </td>
                                                    <td> {reservation.DateDebut} </td>
                                                    <td> {reservation.NmbrNuits} </td>
                                                    <td> {reservation.PrixTotal} </td>
                                                    <td> 
                                                    <Link
                                                    class="btn btn-light btn-rounded"
                                                    to={`/UpdateRes/${reservation.IdRes}/${IdCl}`}
                                                    >Update
                                                    </Link>
                                                    <button
                                                    className="btn btn-light btn-rounded"
                                                    onClick={() => Deletereservation(reservation.IdRes)}
                                                    >
                                                    Delete
                                                    </button>
                                                    </td>
                                                </tr>
                                    </tbody>)
                                        })
                                    }
                                    
                                </table>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
            
        )
    }