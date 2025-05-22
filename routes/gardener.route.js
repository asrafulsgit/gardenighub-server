const express = require('express');
const { getActiveGardeners, getAllGardeners } = require('../controllers/gardener.controllers');
const gardernerRoute = express.Router();


gardernerRoute.get('/api/v1/gardener/active',getActiveGardeners)
gardernerRoute.get('/api/v1/gardeners',getAllGardeners)


module.exports = gardernerRoute;