const mongoose = require("mongoose");

const savedTipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    tip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GardeningTip",
      required: [true, "Tip reference is required"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SavedTip = mongoose.model("SavedTip", savedTipSchema);

module.exports = SavedTip;
