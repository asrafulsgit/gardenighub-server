const express = require('express');
const { getActiveGardeners, getAllGardeners, gardenerDetails } = require('../controllers/gardener.controllers');
const gardernerRoute = express.Router();


gardernerRoute.get('/api/v1/gardener/active',getActiveGardeners)
gardernerRoute.get('/api/v1/gardeners',getAllGardeners)
gardernerRoute.get('/api/v1/gardener/:id',gardenerDetails)


module.exports = gardernerRoute;