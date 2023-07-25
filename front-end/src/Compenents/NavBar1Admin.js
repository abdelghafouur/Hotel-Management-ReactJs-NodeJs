import React from "react";
import {Link } from 'react-router-dom';



export default function NavBar1Admin(props)
    {
        return(
              <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                  <h1>HOTIL'MO</h1>
                </div>
                <ul class="nav">
                  <li class="nav-item menu-items">
                  <Link to={`/ListeChambre/${props.IdCl}`}>
                      <div class="nav-link">
                          <span class="menu-icon">
                          <i class='fas fa-home' style={{color:"white"}}></i>
                          </span>
                          <span class="menu-title">gestion des Chambres</span>
                        </div>
                  </Link>
                  </li>
                  <li class="nav-item menu-items">
                  <Link to={`/Listreservations/${props.IdCl}`}>
                    <div class="nav-link">
                      <span class="menu-icon">
                      <i class='fas fa-archive' style={{color:"white"}}></i>
                      </span>
                      <span class="menu-title">les reservations</span>
                    </div>
                    </Link>
                  </li>
                  <li class="nav-item menu-items">
                  <Link to={`/GestionUser/${props.IdCl}`}>
                    <div class="nav-link">
                      <span class="menu-icon">
                      <i class='fas fa-archive' style={{color:"white"}}></i>
                      </span>
                      <span class="menu-title">les reservations</span>
                    </div>
                    </Link>
                  </li>
                  <li class="nav-item menu-items">
                  <Link to={`/MyProfileAdmin/${props.IdCl}`}>
                    <div class="nav-link">
                      <span class="menu-icon">
                      <i class='fas fa-address-book' style={{color:"white"}}></i>
                      </span>
                      <span class="menu-title">Modifier mon  Profile </span>
                    </div>
                    </Link>
                  </li>
                </ul>
              </nav>
        )
        
    }