import React,{ useEffect, useState } from "react";
import axios from "axios";

export default function NavBar2Admin(props)
    {
      const [compte, setcompte] = useState([]);
            async function Getcompte() {
              const url = `http://localhost:4000/client/${props.IdCl}`;
              const res = await axios.get(url);
              const target = res.data.find((obj) => obj.IdCl == props.IdCl);
              setcompte(target);
          }
            // featch all users
            useEffect(() => {
              Getcompte();
            }, []);
        return(
            <nav class="navbar p-0 fixed-top d-flex flex-row">
                  <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <ul class="navbar-nav w-100">
                      <li class="nav-item w-100">
                          <h1>Bonjour Mr : {compte.Nom} {compte.Prenom} </h1>
                      </li>
                    </ul>
                  </div>
            </nav>
        )
    }