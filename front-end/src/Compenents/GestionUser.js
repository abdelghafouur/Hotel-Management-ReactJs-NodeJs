import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar1Admin from "./NavBar1Admin";
import NavBar2Admin from "./NavBar2Admin";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import {Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import axios from "axios";

export default function GestionUser()
    { 
        const [users, setusers] = useState([]);
        const { IdCl } = useParams();
        
        // featch all users
        async function GetUsers() {
            
            const url = `http://localhost:4000/users`;
            const res = await axios.get(url);
            setusers(res.data);
        }
        // featch all users
        useEffect(() => {
            GetUsers();
        }, []);

        async function DeleteUser(IdCl) {
            const url = `http://localhost:4000/users/${IdCl}`;
            const req = await axios.delete(url);
            GetUsers();
            
          }
      
        return(
          <div class="container-scroller">
              <NavBar1Admin IdCl={IdCl}/>
              <div class="container-fluid page-body-wrapper">
                <NavBar2Admin IdCl={IdCl}/>
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
                                        <th> Nom  </th>
                                        <th> Prenom  </th>
                                        <th> Email  </th>
                                        <th> Tele  </th>
                                        <th> Adresse  </th>
                                        <th> User  </th>
                                        <th> Action  </th>
                                       
                                    </tr>
                                    </thead>
                                    {users&&
                                        users.map((user) => {
                                            return(
                                                <tbody>
                                                <tr>
                                                    <td> {user.Nom} </td>
                                                    <td> {user.Prenom} </td>
                                                    <td> {user.Email} </td>
                                                    <td> {user.Tele} </td>
                                                    <td> {user.Adresse} </td>
                                                    <td> {user.User} </td>
                                                    <td> 
                                                    <button
                                                    className="btn btn-light btn-rounded"
                                                    onClick={() => DeleteUser(user.IdCl)}
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