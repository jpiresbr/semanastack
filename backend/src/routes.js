const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileControler = require('./controllers/profileController');
const sessionControler = require('./controllers/sessionController');
const routes = express.Router();

routes.post("/sessions", sessionControler.create);

routes.get("/ongs", ongController.index); 
routes.post('/ongs', ongController.create);

routes.get("/profile", profileControler.index); 

routes.get("/profile", profileControler.index); 

routes.get("/incidents", incidentController.index); 
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes; 