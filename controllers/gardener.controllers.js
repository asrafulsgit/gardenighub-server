const Gardener = require('../models/gardener.model');
const Tip = require('../models/tips.model')

const createGardener = async (req, res) => {
  const { userId } = req.user;
  
  try {

    const {
    bio,
    location,
    yearsOfExperience,
    age,
    sex,
    specialist,
    services,
    favoritePlants
    } = req.body;
    const profile = await Gardener.findOne({ user: userId });
    if(!profile){
      const newGardener = new Gardener({
      bio,
      location,
      yearsOfExperience,
      age : Number(age),
      sex,
      specialist,
      services,
      favoritePlants,
      user : userId,
    });
    const savedGardener = await newGardener.save();
    }
   
    if(profile){
          await Gardener.findByIdAndUpdate(profile._id, {
            bio,
            location,
            yearsOfExperience,
            age,
            sex,
            specialist,
            services,
            favoritePlants
          })
        }
    

    return res.status(201).json({
      success: true,
      message: 'Gardener created successfully',
      data: profile
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
  const activeGardeners = await Gardener.find({ isActive: true }).populate('user','avatar name email').limit(6);
   
    return res.status(200).json({
      success: true,
      message: 'Fetched active gardeners successfully',
      data : activeGardeners
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
    // Parse query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Gardener.countDocuments();

    // Fetch paginated data
    const gardeners = await Gardener.find().populate('user','name avatar email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: 'Gardeners fetched successfully',
      total,
      page,
      pages: totalPages,
      hasMore: page < totalPages,
      count: gardeners.length,
      data: gardeners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching gardeners',
      error: error.message,
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
        const gardener = await Gardener.findById(id);
        return res.status(200).send({
            message: 'gardener fetched',
            profile : gardener,
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

const gardenerProfile = async(req,res)=>{
    const {userId} = req.user;
    
    try {

         if (!userId) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }

        const gardener = await Gardener.findOne({user : userId});
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
    gardenerDetails,
    gardenerProfile
};






