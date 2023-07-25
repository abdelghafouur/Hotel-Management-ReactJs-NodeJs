import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Compenents/login';
import Chambres from './Compenents/Chambres';
import Myreservations from './Compenents/Myreservations';
import MyProfile from './Compenents/MyProfile';
import UpdateRes from './Compenents/UpdateRes';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Reserver from './Compenents/Reserver';
import Signup from './Compenents/signup';
import ListeChambre from './Compenents/ListeChambre';
import UpdateChambre from './Compenents/UpdateChambre';
import AddChamber from './Compenents/AddChamber';
import Listreservations from './Compenents/Reservations';
import GestionUser from './Compenents/GestionUser';
import MyProfileAdmin from './Compenents/MyProfileAdmin';


function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="/Chambres/:IdCl" element={<Chambres/>}/>
            <Route path="/ListeChambre/:IdCl" element={<ListeChambre/>}/>
            <Route path="/Myreservations/:IdCl" element={<Myreservations/>}/>
            <Route path="/MyProfile/:IdCl" element={<MyProfile/>}/>
            <Route path="/UpdateRes/:IdRes/:IdCl" element={<UpdateRes/>}/>
            <Route path="/Reserver/:NumChamb/:IdCl" element={<Reserver/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/UpdateChambre/:NumChamb/:IdCl" element={<UpdateChambre/>}/>
            <Route path="/AddChamber/:IdCl" element={<AddChamber/>}/>
            <Route path="/MyProfileAdmin/:IdCl" element={<MyProfileAdmin/>}/>
            <Route path="/Listreservations/:IdCl" element={<Listreservations/>}/>
            <Route path="/GestionUser/:IdCl" element={<GestionUser/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
