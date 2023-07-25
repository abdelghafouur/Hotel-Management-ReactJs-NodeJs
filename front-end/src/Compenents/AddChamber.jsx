import React,{ useEffect, useState } from "react";
import NavBar1 from "./NavBar1";
import NavBar1Admin from "./NavBar1Admin";
import NavBar2Admin from "./NavBar2Admin";
import NavBar2 from "./NavBar2";
import '../style/styleDAsch.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AddChamber()
    { 
        const history = useNavigate();
        const { IdCl } = useParams();

        const [file,setFile] = useState("");
    const [NumChamb,setNumChamb] = useState("");
        const [NumEtage,setNumEtage] = useState("");
        const [NmbCouchage,setNmbCouchage] = useState("");
        const [NmbBain,setNmbBain] = useState("");
        const [Type,setType] = useState("");
        const [Prix,setPrix] = useState("");

        const setimgfile = (e)=>{
          setFile(e.target.files[0])
      }
  
    const adddChambre = async(e)=>{
      e.preventDefault();
        var formData = new FormData();
        formData.append("photo",file)
        formData.append("NumChamb",NumChamb)
        formData.append("NumEtage",NumEtage);
        formData.append("NmbCouchage",NmbCouchage);
        formData.append("NmbBain",NmbBain);
        formData.append("Type",Type);
        formData.append("Prix",Prix);
        
   

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        const res = await axios.post("http://localhost:4000/getdata",formData,config);
       
        if(res.data.status == 201){
            history(`/ListeChambre/${IdCl}`)
        }else{
            console.log("error")
        }
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
                    <h4 class="card-title">Add Chambre </h4>
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Image for chambre </label>
                        <input type="file" name='photo' class="form-control" style={{color:"black"}}  onChange={setimgfile} />
                      </div>
                      <div class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Numero du Chambre </label>
                        <input type="text" name='Numchamb' class="form-control" style={{color:"black"}}   onChange={(e) => setNumChamb( e.target.value )} />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputUsername1">Numero du etage </label>
                        <input type="text" name='Numetage' class="form-control" style={{color:"black"}}   onChange={(e) => setNumEtage( e.target.value )} />
                      </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1"> NmbCouchage </label>
                        <input type="text" name='Nmbcouchage' class="form-control" style={{color:"black"}}  onChange={(e) => setNmbCouchage( e.target.value )}  />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1"> Numbre bain </label>
                        <input type="text" name='Nmbbain' class="form-control" style={{color:"black"}}  onChange={(e) => setNmbBain( e.target.value )}  />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Type</label>
                        
                           
                           <select  class="form-control col-xl-8 " name='Type' onChange={(e) => setType( e.target.value )} >
                           <option value="rien" selected>Choisir type</option>
                           <option value="single" >Single</option>
                           <option value="double" >Double</option>
                           </ select>
                         
                       
                           
                           
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1" >PRIX </label>
                        <input type="text" class="form-control" name='Prix' onChange={(e) => setPrix( e.target.value )}/>
                      </div>
                      <button type="submit" class="btn btn-primary mr-2" onClick={adddChambre}>Submit</button>
                    </form>
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
            
   