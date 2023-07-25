import React,{ useEffect, useState } from "react";
import '../style/StyleForm.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chambres from "./Chambres";
import {Link } from 'react-router-dom';


export default function Login()
    {

        const Navigate = useNavigate();
        const [User, setUser] = useState("")
        const [Password, setPassword] = useState("")
        async function GetCompte() {
          const url = `http://localhost:4000/compte/${User}/${Password}`;
          const res = await axios.get(url);
          (typeof(res.data) == "object" )
          ?(
            (res.data.find((obj) => obj.User == User && obj.Password == Password ).Role == "user")
            //?(Navigate(`/Chambres`,{ state : {IdCl : res.data.find((obj) => obj.User == User && obj.Password == Password ).IdCl} }))
            ?(Navigate(`/Chambres/${res.data.find((obj) => obj.User == User && obj.Password == Password ).IdCl}`))
            :((Navigate(`/ListeChambre/${res.data.find((obj) => obj.User == User && obj.Password == Password ).IdCl}`)))
            )
          :(alert(" login or Password incorrect !!!"))
        }

        return(
            <div>
                <div class="d-md-flex half">
                    <div className="bg bg2"></div>
                    <div class="contents">
                        <div class="container">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-12">
                                    <div class="form-block mx-auto">
                                        <div class="text-center mb-5">
                                            <h3 style={{color:"black"}}>Login to <strong style={{color:"red"}}>HOTIL'MO</strong></h3>
                                        </div>
                                        <div>
                                            <div class="form-group first">
                                            <label for="username" style={{color:"black"}}>Username </label>
                                            <input type="text" style={{color:"black"}} class="form-control" placeholder="your-email@gmail.com" id="username" 
                                            onChange={(e) => setUser(e.target.value)} />
                                            </div>
                                            <div class="form-group last mb-3">
                                            <label for="password" style={{color:"black"}}>Password </label>
                                            <input type="password" style={{color:"black"}} class="form-control" placeholder="Your Password" id="password" 
                                            onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                            <div class="d-sm-flex mb-5 align-items-center">
                                            <span class="ml-auto">  <Link
                                                                    class="forgot-pass"
                                                                    to="/Signup"
                                                                    >Sign up
                                                                </Link></span> 
                                            </div>
                                            <input type="submit" value="Log In" class="btn btn-block " onClick={GetCompte} />
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