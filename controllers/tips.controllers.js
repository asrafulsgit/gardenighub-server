
const Tip = require("../models/tips.model");


const createTip = async (req, res) => {
    const { userId } = req.user; 
 
    const {
        title,
        plantType,
        difficulty,
        description,
        image,
        category,
        availability,
    } = req.body;
   
    try {
        if (!title || !plantType || !difficulty || !description || !image ||
             !category || !availability ) {
            return res.status(400).send({
                message: "All fields are required.",
                success: false
            });
        }
        const newTip = new Tip({
            title,
            plantType,
            difficulty,
            description,
            image,
            category,
            availability,
            user : userId
        });

        await newTip.save();

        return res.status(201).send({
            message: 'Tip successfully created.',
            success: true
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
}


const myTips = async(req,res)=>{
    const {userId} = req.user;
     
    try {
         if (!userId ) {
            return res.status(400).send({
                message: "user id is required.",
                success: false
            });
        }
        const tips = await Tip.find({user : userId}).sort({createdAt : -1})
        return res.status(200).send({
            message: 'tips fetched',
            tips,
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
const tipsDetails = async(req,res)=>{
    const {id} = req.params;
    try {
         if (!id ) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }
        const tip = await Tip.findById(id).populate('user', 'email name photo');
        return res.status(200).send({
            message: 'tips fetched',
            tip,
            success: false
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
}

const updateTip = async (req, res) => {
     const {
        title,
        plantType,
        difficulty,
        description,
        image,
        category,
        availability,
    } = req.body?.formData;

    const {id}  = req.params;

    try {
       if (!id ) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }

        const updatedTip = await Tip.findByIdAndUpdate(
           {_id :  id,user : req.user.userId},
            {
        title,
        plantType,
        difficulty,
        description,
        image,
        category,
        availability
    },
            { new: true } 
        );
   
        if (!updatedTip) {
            return res.status(404).send({
                message: 'Tip not found.',
                success: false
            });
        }

        return res.status(200).send({
            message: 'Tip successfully updated.',
            success: true,
            data: updatedTip
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
};

const browseTips = async(req,res)=>{
    
    try {
        const tips = await Tip.find({ availability : 'Public'}).sort({createdAt : -1})
        return res.status(200).send({
            message: 'tips fetched',
            tips,
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
const TrendingTips = async(req,res)=>{
    try {
        const tips = await Tip.find({ availability : 'Public'}).limit(6)
        return res.status(200).send({
            message: 'tips fetched',
            tips,
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

const likeTip = async (req, res) => {
    const { id } = req.params;

    try {
         if (!id ) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }
        const updatedTip = await Tip.findByIdAndUpdate(
            { _id: id },
            { $inc: { likes: 1 } }, 
            { new: true } 
        );

        if (!updatedTip) {
            return res.status(404).send({
                message: 'Tip not found',
                success: false
            });
        }

        return res.status(200).send({
            message: 'Tip liked successfully',
            success: true,
        });
    } catch (error) {
       
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
};

const deleteTip = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    try {
         if (!id ) {
            return res.status(400).send({
                message: "id is required.",
                success: false
            });
        }

        await Tip.findOneAndDelete({_id : id, user : userId});

        return res.status(200).send({
            message: 'Tip deleted',
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error: error.message
        });
    }
};

const filterTips = async(req,res)=>{
    const {level} = req.query;
    try {

        const levels = ['Easy', 'Medium', 'Hard']
        if(!levels.includes(level)){
            return res.status(400).send({
            message: 'Wrong Input!',
            success: false
            })
        }
        const tips = await Tip.find({ difficulty : level,availability : 'Public'}).sort({createdAt : -1})
        return res.status(200).send({
            message: 'tips fetched',
            tips,
            success: false
        });
    } catch (error) {
   
        return res.status(500).send({
            message: 'Something broke!',
            success: false,
            error : error.message
        });
    }
}

const searchTips = async(req,res)=>{ 
     try {
       const {search} = req.query;
       
       if(!search) {
        return res.status(404).send({ 
          success: false, 
          message: `Please enter event name!` 
        });
       }
  
       const tips = await Tip.find({ category : {$regex: search, $options: 'i'} })
       
       return res.status(200).send({ 
         success: true, 
         tips,
         message: 'Search tips successfull' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ 
        success: false, 
        message: "Something broke!" 
    });
     }
   }




module.exports ={
    createTip,
    updateTip,
    myTips,
    tipsDetails,
    browseTips,
    likeTip,
    TrendingTips,
    deleteTip,
    filterTips,
    searchTips
}