import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Reserver()
    { 
        const Navigate = useNavigate();
        const { NumChamb,IdCl } = useParams();
        const datee = new Date();
        const [chambre, setChambre] = useState({});
        const [reserver, setreserver] = useState({
            DateRes:datee,
            DateDebut: "", 
            NmbrNuits: "",
            PrixTotal:0,
            NumChamb :NumChamb,
            IdCln:IdCl,
        });
        
        async function Getchambre() {
          const url = `http://localhost:4000/Chambres/${NumChamb}`;
          const res = await axios.get(url);
          const target = res.data.find((obj) => obj.NumChamb == NumChamb);
          setChambre(target);
        }
        useEffect(() => {
            Getchambre();
        }, []);
        useEffect(() => {
          setreserver({ ...reserver, PrixTotal: (reserver.NmbrNuits * chambre.Prix)});
      }, [reserver]);
      
        

        async function reserverr() {
            const url = "http://localhost:4000/Myreservations";
            const req = await axios.post(url, reserver);
            Navigate(`/Chambres/${IdCl}`);
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
                            <h4 class="card-title">Reservation </h4>
                            <div class="forms-sample">
                            <div class="d-flex py-4">
                              <ul class=".list-ticked">
                                <li>NumEtage : {chambre.NumEtage}</li>
                                <li>NmbCouchage : {chambre.NmbCouchage}</li>
                                <li>NmbBain : {chambre.NmbBain}</li>
                                <li>Type : {chambre.Type}</li>
                                <li>Prix Chambre : {chambre.Prix}</li>
                              </ul>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Date Debut</label>
                                <input type="date" class="form-control" onChange={(e) => setreserver({ ...reserver, DateDebut: e.target.value })}/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputConfirmPassword1">Nmbr Nuits </label>
                                <input type="text" class="form-control" onChange={(e) => setreserver({ ...reserver, NmbrNuits: e.target.value })} />
                            </div>
                            <button type="submit" class="btn btn-primary mr-2" onClick={reserverr}>Submit</button>
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