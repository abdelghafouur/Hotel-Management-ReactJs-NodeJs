import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/StyleForm2.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup()
    {
       const Navigate = useNavigate();

        const [compte, setcompte] = useState({
            Nom: "", 
            Prenom: "", 
            Tele: "",
            User:"",
            Email:"",
            Adresse:"",
            Password:""
        });
       
            async function insertUser() {
                const url = `http://localhost:4000/User`;
                 const req = await axios.post(url, compte);
                 Navigate("/");

            }
        
        return(
            <div>
                <div class="d-lg-flex half">
                    <div class="bg bg3 order-1 order-md-2"></div>
                    <div class="contents order-2 order-md-1">
                        <div class="container">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-7">
                                    <h3 style={{color:"black"}}>Login to <strong>HOTIL'MO</strong></h3>
                                    <div>
                                        <div class="row firstdiv">
                                            <div class="col">
                                                <input type="text" style={{color:"black"}} class="form-control" placeholder="First name" onChange={(e)=>setcompte({...compte,Nom :e.target.value})}/>
                                            </div>
                                            <div class="col">
                                                <input type="text" style={{color:"black"}} class="form-control" placeholder="Last name"onChange={(e)=>setcompte({...compte,Prenom :e.target.value})}/>
                                            </div>
                                        </div>
                                        <div class="form-group ">
                                            <label for="username" style={{color:"black"}}>Email</label>
                                            <input type="text" style={{color:"black"}} class="form-control" placeholder="your-email@gmail.com"  onChange={(e)=>setcompte({...compte,Email :e.target.value})}/>
                                        </div>
                                        <div class="form-group ">
                                            <label for="username" style={{color:"black"}}>username</label>
                                            <input type="text" style={{color:"black"}} class="form-control" placeholder="your-email@gmail.com" onChange={(e)=>setcompte({...compte,User :e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="password" style={{color:"black"}}>Password</label>
                                            <input type="password" style={{color:"black"}} class="form-control" placeholder="Your Password"  onChange={(e)=>setcompte({...compte,Password :e.target.value})}/>
                                        </div>
                                      
                                        <div class="form-group">
                                            <label for="password" style={{color:"black"}}>Adress</label>
                                            <input type="text" style={{color:"black"}} class="form-control" placeholder="Your Adress"   onChange={(e)=>setcompte({...compte,Adresse :e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="text" style={{color:"black"}}>Tel </label>
                                            <input type="text"style={{color:"black"}}  class="form-control" placeholder="Your Tel"   onChange={(e)=>setcompte({...compte,Tele :e.target.value})}/>
                                        </div>
                                        <input type="submit" value="Log In" class="btn btn-block" onClick={insertUser} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }