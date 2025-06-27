const express = require('express');
const userAuthentication = require('../middlewares/userAuth-middleware');
const { createEvent, eventDetails, updateEvent, featuredEvents, browseEvent, deleteEvent, myEvents, filterEventsWithType, searchEvents } = require('../controllers/event.controllers');
const eventRouter = express.Router();

eventRouter.post('/event/create',userAuthentication, createEvent)
eventRouter.get('/event/details/:event',userAuthentication, eventDetails)
eventRouter.put('/event/update/:event',userAuthentication, updateEvent)
eventRouter.get('/browse/events', browseEvent)
eventRouter.get('/featured/events', featuredEvents)
eventRouter.delete('/event/delete/:event',userAuthentication, deleteEvent)
eventRouter.get('/my-events',userAuthentication, myEvents)
eventRouter.get('/filter/events',filterEventsWithType)
eventRouter.get('/search/events',searchEvents)





module.exports = eventRouter;