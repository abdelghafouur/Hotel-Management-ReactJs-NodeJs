import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar1Admin from "./NavBar1Admin";

import NavBar2Admin from "./NavBar2Admin";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateChambre()
    { 
        const Navigate = useNavigate();
        const { NumChamb,IdCl} = useParams();
        const [Chambre, setchambre] = useState({
            NmbCouchage: "", 
            NmbBain: "",
            NmbBain :"",
            Prix:"",
            Type:""
        });
        
        async function GetChambre() {
          const url = `http://localhost:4000/Chambres/${NumChamb}`;
          const res = await axios.get(url);
          const target = res.data.find((obj) => obj.NumChamb == NumChamb);
          setchambre(target)
         
        }
        useEffect(() => {
            GetChambre();
        },[]);
        async function UpdateChambre() {
            const url = `http://localhost:4000/Chambres/${NumChamb}`;
            const req = await axios.put(url, Chambre);
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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                            <div class="card-body">
                    <h4 class="card-title">Update  Chambre </h4>
                    <div class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Numero du Chambre </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Chambre.NumChamb} disabled/>
                      </div>
                      <div class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Numero du etage </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Chambre.NumEtage} disabled/>
                      </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1"> NmbCouchage </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Chambre.NmbCouchage} onChange={(e) => setchambre({ ...Chambre, NmbCouchage: e.target.value })}  />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1"> Numbre bain </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Chambre.NmbBain} onChange={(e) => setchambre({ ...Chambre, NmbBain: e.target.value })}  />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Type</label>
                        
                            {
                           
                           (Chambre.Type == 'single')?(
                            <select  class="form-control col-xl-8 " onChange={(e) => setchambre({ ...Chambre, Type: e.target.value })} >
                                <option value="rien">Choisir type</option>
                                <option value="single" selected>Single</option>
                                <option value="double">Double</option>
                              </select>
                           )    :
                           (<select  class="form-control col-xl-8 " onChange={(e) => setchambre({ ...Chambre, Type: e.target.value })} >
                           <option value="rien">Choisir type</option>
                           <option value="single" >Single</option>
                           <option value="double" selected>Double</option>
                         </select>)
                            }
                       
                           
                           
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1" >PRIX </label>
                        <input type="text" class="form-control"value={Chambre.Prix}   onChange={(e) => setchambre({ ...Chambre, Prix: e.target.value })} />
                      </div>
                      <button type="submit" class="btn btn-primary mr-2" onClick={UpdateChambre}>Submit</button>
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