const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileControler = require('./controllers/profileController');
const sessionControler = require('./controllers/sessionController');
const routes = express.Router();

routes.post("/sessions", sessionControler.create);

routes.get("/ongs", ongController.index); 

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required().min(8),
    }).unknown(),
}), profileControler.index); 

routes.get("/incidents", incidentController.index); 

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes; 