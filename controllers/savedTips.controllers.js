const SavedTip = require("../models/savedTip.model");

// create saved tip
const createSavedTip = async (req, res) => {
  const {tip} = req.params;
  const {userId} = req.user;
  try {
    if (!tip || !userId) {
      return res.status(400).json({
        success: false,
        message: 'userId and tip are required.'
      });
    }
    const isBooked = await SavedTip.findOne({tip, user : userId})
    if(isBooked){
    return res.status(400).send({
        message: "Tip is already save!",
        success : false
      });
    }
    const newSavedTip = new SavedTip({
      user : userId,
      tip
    });

    const savedTip = await newSavedTip.save();

    return res.status(201).json({
      success: true,
      message: 'Tip saved successfully',
      tip: savedTip
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while booking',
      error: error.message
    });
  }
};

// my saved tips
const mySavedTips = async (req, res) => {
  const { userId } = req.user;

  try {
    if (!userId) {
      return res.status(400).send({
        message: "User Id is required.",
        success: false,
      });
    }
    const bookEvents = await SavedTip.find({ user : userId }).populate('tip');

    return res.status(200).send({
      message: "My saved tips fetched",
      tips : bookEvents,
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

// delete saved tip
const deleteSavedTip = async (req, res) => {
   const {userId} = req.user;
   const {tip}= req.params;
  try {
    if (!userId || !tip) {
      return res.status(400).send({
        message: "user Id and tip id is required.",
        success: false,
      });
    }

    await SavedTip.findOneAndDelete({tip, user : userId});

    return res.status(200).send({
      message: "Save Tip deleted",
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

module.exports = {
  createSavedTip,
  mySavedTips,
  deleteSavedTip
};