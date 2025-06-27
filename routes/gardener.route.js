const express = require('express');
const gardernerRoute = express.Router();

const userAuthentication = require('../middlewares/userAuth-middleware');
const { getActiveGardeners, getAllGardeners, gardenerDetails, createGardener, gardenerProfile } = require('../controllers/gardener.controllers');


gardernerRoute.post('/gardener/update',userAuthentication, createGardener)
gardernerRoute.get('/gardener/profile',userAuthentication,gardenerProfile )
gardernerRoute.get('/gardener/active',getActiveGardeners)
gardernerRoute.get('/gardeners',getAllGardeners)
gardernerRoute.get('/gardener/:id',gardenerDetails)


module.exports = gardernerRoute;