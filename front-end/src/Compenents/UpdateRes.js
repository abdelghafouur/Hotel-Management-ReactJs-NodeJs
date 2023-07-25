import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateRes()
    { 
        const Navigate = useNavigate();
        const { IdRes,IdCl } = useParams();

        const [Reservations, setReservations] = useState({
          DateDebut: "", 
          NmbrNuits: ""
          
      });
        
        async function GetReservation() {
          const url = `http://localhost:4000/MyreservationsCl/${IdRes}/${IdCl}`;
          const res = await axios.get(url);
          const target = res.data.find((obj) => obj.IdRes == IdRes);
          setReservations(target);
        }
        useEffect(() => {
            GetReservation();
            
        }, []);
      

        async function UpdatReservation() {
          const url = `http://localhost:4000/MyreservationsCl/${IdRes}`;
          const req = await axios.put(url, Reservations);
          Navigate(`/Myreservations/${IdCl}`);
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
                    <h4 class="card-title">Update My reservation </h4>
                    <div class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Numero du Chambre </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Reservations.NumChambr} disabled/>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Date de Reservation </label>
                        <input type="text" class="form-control" style={{color:"black"}} value={Reservations.DateRes} disabled/>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date Debut</label>
                        <input type="text" class="form-control" value={Reservations.DateDebut} onChange={(e) => setReservations({ ...Reservations, DateDebut: e.target.value })} />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1">Nmbr Nuits </label>
                        <input type="text" class="form-control" value={Reservations.NmbrNuits} onChange={(e) => setReservations({ ...Reservations, NmbrNuits: e.target.value })} />
                      </div>
                      <button type="submit" class="btn btn-primary mr-2" onClick={UpdatReservation}>Submit</button>
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