const express = require('express');
const gardernerRoute = express.Router();

const { getActiveGardeners, getAllGardeners, gardenerDetails } = require('../controllers/gardener.controllers');


gardernerRoute.get('/gardener/active',getActiveGardeners)
gardernerRoute.get('/gardeners',getAllGardeners)
gardernerRoute.get('/gardener/:id',gardenerDetails)


module.exports = gardernerRoute;