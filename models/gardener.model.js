const mongoose = require("mongoose");


const gardenerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    bio: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
    },
    age: {
      type: Number,
      min: [10, "Age must be at least 16"],
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    specialist: {
      type: [String],
      default: [],
    },
    services: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
          },
        },
        {
          _id: false,
        }
      ]
    },
    totalTipsShared: {
      type: Number,
      default: 0,
      min: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    favoritePlants: {
      type: [String]
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number, 
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Gardener = mongoose.model("Gardener", gardenerProfileSchema);

module.exports = Gardener;
