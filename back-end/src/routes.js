const express = require("express");

const routes = express.Router();

const userController = require("./Controller/userController");
const sellContractController = require("./Controller/sellContractController");
const placeController = require("./Controller/placeController");
const rentContractController = require("./Controller/rentContractController");
const interestController = require("./Controller/interestController");

routes.get("/user", userController.index);
routes.post("/user/login", userController.login);
routes.get("/user/:id", userController.getUser);
routes.post("/user", userController.create);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/sellContract", sellContractController.index);
routes.post("/sellContract", sellContractController.create);
routes.put("/sellContract", sellContractController.update);
routes.delete("/sellContract/:id", sellContractController.delete);

routes.get("/place", placeController.index);
routes.post("/place", placeController.create);
routes.put("/place/:id", placeController.update);
routes.get("/place/:id", placeController.getPlace);
routes.delete("/place/:id", placeController.delete);

routes.get("/rentContract", rentContractController.index);
routes.post("/rentContract", rentContractController.create);
routes.put("/rentContract", rentContractController.update);
routes.delete("/rentContract/:id", rentContractController.delete);

routes.get("/interest", interestController.index);
routes.post("/interest", interestController.create);
routes.put("/interest", interestController.update);
routes.delete("/interest/:id", interestController.delete);
routes.get('/interest/:id', interestController.getInterest)

module.exports = routes;
