const mongoose = require("mongoose");

const tipCommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have a user"],
    },
    tip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tip",
      required: [true, "Comment must be associated with a tip"],
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      minlength: [3, "Comment must be at least 3 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,  
    versionKey: false,
  }
);

const TipComment = mongoose.model("TipComment", tipCommentSchema);

module.exports = TipComment;
