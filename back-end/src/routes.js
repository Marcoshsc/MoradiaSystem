const express = require('express');

const routes = express.Router();

const userController = require('./Controller/userController');

routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.put('/user', userController.update);
routes.delete('/user/:id', userController.delete);

module.exports = routes;