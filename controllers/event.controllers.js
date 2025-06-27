const Event = require("../models/event.model");

const demoEvent = {
    _id: "e001",
    name: "Organic Gardening Basics",
    type: "Workshop",
    date: "2025-07-10",
    time: "10:00 AM",
    location: "Dhaka Botanical Garden",
    fee: 0,
    description:
      "Learn how to grow organic vegetables using sustainable techniques.",
    image: "https://example.com/images/organic-gardening.jpg",
    maxRegistrations: 50,
    registered: 42,
    organizer: {
      image: "https://example.com/images/organizer1.jpg",
      name: "Asma Khatun",
      email: "asma@gardenhub.com",
    },
    tags: ["Organic", "Vegetables", "Healthy Soil"],
    isFree: true,
    isFull: false,
  };

//create event
const createEvent = async (req, res) => {
   
  const { userId } = req.user; 
  const {
    name,
    type,
    date,
    time,
    location,
    fee,
    description,
    image,
    maxRegistrations,
    requirements,
    tags
  } = req.body; 
  try {
    if (
      !name.trim() ||
      !type ||
      !description.trim() ||
      !image ||
      !date ||
      !location ||
      !time ||
      !fee ||
      !maxRegistrations ||
      !tags 
    ) {
      return res.status(400).send({
        message: "Please fillup requied fields.",
        success: false,
      });
    }
    

    const newEvent = new Event({
    name,
    type,
    date,
    time,
    location,
    fee : Number(fee),
    description,
    image,
    maxRegistrations : Number(maxRegistrations),
    requirements,
    isFree: Number(fee) === 0,
    tags,
    organizer : userId
    });

    await newEvent.save();
    
    return res.status(201).send({
      message: "Event successfully created.",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};
// event details
const eventDetails = async (req, res) => {
  const { event } = req.params;

  try {
    if (!event) {
      return res.status(400).send({
        message: "Event id is required.",
        success: false,
      });
    }
    const eventDetails = await Event.findById(event).populate("organizer", "name email image");
    return res.status(200).send({
      message: "Event fetched",
      event : eventDetails,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};
// Updae event
const updateEvent = async (req, res) => {
  const {userId,email} = req.user;
  const {event} = req.params;
  const {
    name,
    type,
    date,
    time,
    location,
    fee,
    description,
    image,
    maxRegistrations,
    requirements,
    organizer,
    tags
  } = req.body;
  if (
    !type ||
    !name.trim() ||
    !description.trim() ||
    !image ||
    !date ||
    !location.trim() ||
    !time ||
    !fee ||
    !tags ||
    !organizer?.email.trim() ||
    !organizer?.name.trim()
  ) {
    return res.status(400).send({
      message: "All fields are required.",
      success: false,
    });
  }
  
  if(organizer.email !== email){
    return res.status(400).send({
      message: "Unauth user!",
      success: false,
    });
  }

  try {
    if (!event || !userId ) {
      return res.status(400).send({
        message: "event id and user id is required.",
        success: false,
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: event, organizer: userId },
      {
        name,
        type,
        date,
        time,
        location,
        fee : Number(fee),
        description,
        image,
        maxRegistrations : Number(maxRegistrations),
        requirements,
        isFree: Number(fee) === 0,
        tags,
        organizer : userId
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).send({
        message: "Event not found.",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Event successfully updated.",
      success: true,
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// all events for event page
const browseEvent = async (req, res) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Event.countDocuments();

    // Fetch events
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      total,
      page,
      pages: totalPages,
      hasMore: page < totalPages,
      count: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events",
      error: error.message,
    });
  }
};


// featured events for lading page
const featuredEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(6);
    return res.status(200).send({
      message: "Events fetched",
      events,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// delete event
const deleteEvent = async (req, res) => {
  const { userId } = req.user;
  const { event } = req.params;
  try {
    if (!userId || !event) {
      return res.status(400).send({
        message: "userId is required.",
        success: false,
      });
    }

    await Event.findOneAndDelete({ _id: event, organizer: userId });

    return res.status(200).send({
      message: "Event deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};


// my events organized by me
const myEvents = async (req, res) => {
  const { userId } = req.user;
  try {
    if (!userId) {
      return res.status(400).send({
        message: "user ID is required.",
        success: false,
      });
    }
    const events = await Event.find({ organizer : userId }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      message: "Events fetched",
      events,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};


const filterEventsWithType = async(req,res)=>{
  const {eventType} = req.query; 
  try {
    if(!eventType){
      return res.status(404).send({ 
      success: false, 
      message: 'Event type is required!' 
    });
    }
    const events = await Event.find({type : eventType})
    return res.status(200).send({ 
      success: true, 
      events,
      message: 'Events filter successfull' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
        success: false, 
        message: "Something broke!" 
    });
  }
}


const searchEvents = async(req,res)=>{ 
     try {
       const {search} = req.query;
       
       if(!search) {
        return res.status(404).send({ 
          success: false, 
          message: `Please enter event name!` 
        });
       }
  
       const events = await Event.find({ name : {$regex: search, $options: 'i'} })
       
       return res.status(200).send({ 
         success: true, 
         events,
         message: 'Search events successfull' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ 
        success: false, 
        message: "Something broke!" 
    });
     }
   }




module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  browseEvent,
  eventDetails,
  featuredEvents,
  myEvents,
  filterEventsWithType,
  searchEvents
};
