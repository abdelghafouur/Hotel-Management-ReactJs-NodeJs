import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import NavBar1Admin from "./NavBar1Admin";
import NavBar2Admin from "./NavBar2Admin";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyProfileAdmin()
    {
      const { IdCl } = useParams();
      const Navigate = useNavigate();
      const [compte, setcompte] = useState({});
      
      async function GetCompte() {
        const url = `http://localhost:4000/MyProfile/${IdCl}`;
        const res = await axios.get(url);
        const target = res.data.find((obj) => obj.IdCl == IdCl);
        setcompte(target);
      }
      useEffect(() => {
        GetCompte();
      }, []);
    
      async function UpdatCompte() {
        const url = `http://localhost:4000/MyProfile/${IdCl}`;
        const req = await axios.put(url, compte);
        Navigate(`/ListeChambre/${IdCl}`);
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
                        <div class="col-12 grid-margin stretch-card">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title">Modifier Profile admin   </h4>
                              <div class="forms-sample">
                                <div class="form-group">
                                  <label for="exampleInputName1">Nom : </label>
                                  <input type="text" class="form-control" value={compte.Nom} onChange={(e) => setcompte({ ...compte, Nom: e.target.value })} id="exampleInputName1" />
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail3">Prenom : </label>
                                  <input type="text" class="form-control" value={compte.Prenom} onChange={(e) => setcompte({ ...compte, Prenom: e.target.value })}  id="exampleInputEmail3"/>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail4">Email : </label>
                                  <input type="email" class="form-control" value={compte.Email} onChange={(e) => setcompte({ ...compte, Email: e.target.value })}  id="exampleInputEmail4"/>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail5">Tele : </label>
                                  <input type="text" class="form-control" value={compte.Tele}onChange={(e) => setcompte({ ...compte, Tele: e.target.value })}  id="exampleInputEmail5"/>
                                </div>
                                <div class="form-group">
                                  <label for="exampleTextarea1">Adresse : </label>
                                  <textarea class="form-control" id="exampleTextarea1" value={compte.Adresse}onChange={(e) => setcompte({ ...compte, Adresse: e.target.value })}  rows="4"></textarea>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail7">User : </label>
                                  <input type="text" class="form-control" value={compte.User}onChange={(e) => setcompte({ ...compte, User: e.target.value })}  id="exampleInputEmail7"/>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword4">Password</label>
                                  <input type="password" class="form-control" value={compte.Password} onChange={(e) => setcompte({ ...compte, Password: e.target.value })} id="exampleInputPassword4"/>
                                </div>
                                <button type="submit" class="btn btn-primary mr-2" onClick={UpdatCompte}>Submit</button>
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