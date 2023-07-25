const express = require('express');
const routes =express.Router();
const {getAllChambres,getAllChambresPrix,getAllChambrestype,getAllChambresPrixFix,getAllChambresEtage,getChambreById,addChambre,updateChambre,deleteChambre} = require('../controllers/chambresController');
  // --------------------------------------------------all products

routes.route('/chambres').get(getAllChambres);
routes.route('/ChambresPrix').get(getAllChambresPrix);
routes.route('/ChambresType/:type').get(getAllChambrestype);
routes.route('/ChambresPrixFix/:prix').get(getAllChambresPrixFix);
routes.route('/ChambresEtage/:NumEtage').get(getAllChambresEtage);
routes.route('/chambre/:NumChamb').get(getChambreById);
routes.route('/addchambres').post(addChambre);
routes.route('/updatechambres/:NumChamb').patch(updateChambre);
routes.route('/deletechambres/:NumChamb').delete(deleteChambre);


module.exports = routes;
