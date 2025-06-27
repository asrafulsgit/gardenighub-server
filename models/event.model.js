const mongoose = require("mongoose");


const gardenEventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
      enum: [
  "Planting Workshop",
  "Composting Seminar",
  "Organic Gardening Talk",
  "Seed Exchange",
  "Garden Tour",
  "Tree Plantation Drive",
  "Soil Health Workshop",
  "Urban Gardening Meetup",
  "Permaculture Session",
  "Hydroponics Training",
  "Seasonal Flower Festival",
  "Gardening Competition",
  "Tool Usage Demo",
  "Home Garden Design Workshop",
  "Pest Control Awareness",
  "Herbal Garden Workshop",
  "Rainwater Harvesting Event",
  "Vertical Garden Workshop",
  "Kids Gardening Camp",
  "Community Garden Volunteering"
],
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    fee: {
      type: Number,
      required: [true, "Event fee is required"],
      min: [0, "Fee cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
      trim: true,
    },
    maxRegistrations: {
      type: Number,
      required: [true, "Max registrations is required"],
      min: [1, "Must allow at least 1 registration"],
    },
    registered: {
      type: Number,
      default: 0,
      min: [0, "Registered cannot be negative"],
    },
    requirements: {
      type: String,
      trim: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer information is required"],
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
      validate: [
        (arr) => arr.length > 0,
        "There must be at least one tag",
      ],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,  
    versionKey: false,
  }
);

const Event = mongoose.model("GardenEvent", gardenEventSchema);

module.exports =  Event;
