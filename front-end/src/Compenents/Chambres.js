import React,{ useEffect, useState } from "react";
import pic1 from "../images/pic1.jpg"
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import axios from "axios";
import {Link } from 'react-router-dom';
import { useParams } from "react-router-dom";



export default function Chambres()
    {
      const [Chambre, setChambre] = useState([]);
      const [varb1, setvarb1] = useState("");
      const [varb2, setvarb2] = useState("");
      const [varb3, setvarb3] = useState("");
      const [Back_up, setBack_up] = useState([]);
      const { IdCl } = useParams();

        const GetChambre = async () => {
          const res = await axios.get("http://localhost:4000/getdata", {
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          if (res.data.status == 201) {
              console.log("data get");
              setChambre(res.data.data);
              setBack_up(res.data.data);
  
          } else {
              console.log("error")
          }
      }


        // featch all users
        useEffect(() => {
          GetChambre();
        }, []);
        function SearchParNum()
          {
            let resultat = Back_up.filter((e)=> (e.NumChamb == varb1 ))
            if(resultat == 0 )
              {
                alert(`La chambre numero ${varb1} n'existe pas .`)
                setChambre(Back_up)
              }
            else
              {
                setChambre(resultat)
              }
          }
          function SearchParType()
          {
            const resultat =  Back_up.filter((e)=> (e.Type == varb2 ))
            if(resultat == 0 )
              {
                alert(`Il n'y a pas des chambres ${varb2}s .`)
                setChambre(Back_up)
              }
            else
              {
                setChambre(resultat)
              }
          }
          function SearchParPrix()
          {
            const resultat =  Back_up.filter((e)=> (e.Prix <= varb3 ))
            if(resultat == 0 )
              {
                alert(`Il n'y a pas des chambres a ce prix ${varb3}s .`)
                setChambre(Back_up)
              }
            else
              {
                setChambre(resultat)
              }
          }
        return(
          <div class="container-scroller">
              <NavBar1 IdCl={IdCl} />
              <div class="container-fluid page-body-wrapper">
                <NavBar2 IdCl={IdCl}/>
                <div class="main-panel">
                  <div class="content-wrapper">
                    <div class="row">
                      <div class="col-12 grid-margin stretch-card">
                        <div class="card">
                          <div class="row card-body py-3 px-3 px-sm-3">
                            <div class="form-inline col-xl-4">
                              <input type="text" class="form-control mb-2 mr-sm-2" onChange={(e) => setvarb1(e.target.value)} placeholder="Entrer Numero Du Chamber"/>
                              <input type="submit" class="btn btn-secondary mb-2" onClick={ ()=> SearchParNum()} value="Submit" />
                            </div> 
                            <div class="col-xl-4 row ">
                              <select onChange={(e) => setvarb2(e.target.value)} class="form-control col-xl-8 ">
                                <option value="rien">Choisir type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                              </select>
                              <p class="col-xl-1"></p>
                              <input type="submit" class="btn btn-secondary mb-2 col-xl-3" onClick={ ()=> SearchParType()} value="Submit" />
                            </div>
                            <div class="col-xl-4 row">
                              <p class="col-xl-1"></p>
                              <div class="col-xl-7">
                                <div class="form-group">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text bg-primary text-white">$</span>
                                    </div>
                                    <input type="text" class="form-control" onChange={(e) => setvarb3(e.target.value)} aria-label="Amount (to the nearest dollar)"/>
                                    <div class="input-group-append">
                                      <span class="input-group-text">.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="col-xl-1"></p>
                              <input type="submit" class="btn btn-secondary mb-2 col-xl-3" onClick={ ()=> SearchParPrix()} value="Submit" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                    {Chambre&&
                                        Chambre.map((element) => {
                                            return(
                      <div class="col-md-6 col-xl-4 grid-margin stretch-card">
                        <div class="card">
                        
                          <div class="card-body">
                            <h4 class="card-title">Chamber numero {element.NumChamb}: </h4>
                            <div class="owl-carousel owl-theme full-width owl-carousel-dash portfolio-carousel" id="owl-carousel-basic">
                              <div class="item">
                                <img src={`http://localhost:4000/uploads/${element.image}`}  alt="" style={{height:"250px",width:"300px"}} />
                              </div>
                            </div>
                            <div class="d-flex py-4">
                              <ul class=".list-ticked">
                                <li>NumEtage : {element.NumEtage}</li>
                                <li>NmbCouchage : {element.NmbCouchage}</li>
                                <li>NmbBain : {element.NmbBain}</li>
                                <li>Type : {element.Type}</li>
                              </ul>
                            </div>
                            <div class="d-flex flex-row justify-content-between">
                              <h4 ></h4>
                              <h3 class="h5 mb-1 text-primary "><i class="mdi mdi-cart-outline"></i> PRIX : {element.Prix} DH. </h3>
                            </div>
                            <div class="d-flex flex-row justify-content-between">
                              <h4 ></h4>
                              <Link
                                  class="btn btn-light btn-rounded"
                                  to={`/Reserver/${element.NumChamb}/${IdCl}`}
                                  >Reservation
                              </Link>
                            </div>          
                          </div>          
                        </div>
                      </div>
                      )
                    })
                }
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )
    }