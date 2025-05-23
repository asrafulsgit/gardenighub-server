const Gardener = require('../models/gardener.model');

const createGardener = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      status,
      experiences,
      image,
      totalSharedTips,
      bio
    } = req.body;

 
    if (!name || !age || !gender || !experiences) {
      return res.status(400).json({
        success: false,
        message: 'Name, age, gender, and experiences are required.'
      });
    }

    const newGardener = new Gardener({
      name,
      age,
      gender,
      status,
      experiences,
      image,
      totalSharedTips,
      bio
    });

    const savedGardener = await newGardener.save();

    return res.status(201).json({
      success: true,
      message: 'Gardener created successfully',
      data: savedGardener
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while creating gardener',
      error: error.message
    });
  }
};

const getActiveGardeners = async (req, res) => {
  try {
    const activeGardeners = await Gardener.find({ status: 'Active' }).limit(6);

    return res.status(200).json({
      success: true,
      message: 'Fetched active gardeners successfully',
      activeGardeners
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching active gardeners',
      error: error.message
    });
  }
};

const getAllGardeners = async (req, res) => {
  try {
    const gardeners = await Gardener.find();

    return res.status(200).json({
      success: true,
      message: 'All gardeners fetched successfully',
      gardeners
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching gardeners',
      error: error.message
    });
  }
};
const gardenerDetails = async(req,res)=>{
    const {id} = req.params;
    
    try {
         if (!id) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }
        const gardener = await Gardener.findById(id)
        return res.status(200).send({
            message: 'gardener fetched',
            gardener,
            success: false
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
}



module.exports = { 
    createGardener,
    getActiveGardeners,
    getAllGardeners,
    gardenerDetails
};






