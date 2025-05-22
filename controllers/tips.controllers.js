
const Tip = require("../models/tips.model");


const createTip = async (req, res) => {
    const {
        title,
        plantType,
        difficulty,
        description,
        image,
        category,
        availability,
        user
    } = req.body;

    try {
        if (!title || !plantType || !difficulty || !description || !image || !category || !availability || !user?.email || !user?.name) {
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
            user
        });

        await newTip.save();

        return res.status(201).send({
            message: 'Tip successfully created.',
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false
        });
    }
}


const myTips = async(req,res)=>{
    const {email} = req.query;
    try {
         if (!email ) {
            return res.status(400).send({
                message: "Email is required.",
                success: false
            });
        }
        const tips = await Tip.find({"user.email" : email})
        return res.status(200).send({
            message: 'tips fetched',
            tips,
            success: false
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false
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
        const tip = await Tip.findById(id)
        return res.status(200).send({
            message: 'tips fetched',
            tip,
            success: false
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false
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
        user
    } = req.body?.formData;
    const {id}  = req.params;

    try {
       
        const updatedTip = await Tip.findByIdAndUpdate(
           {_id :  id},
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
            success: false
        });
    }
};

const browseTips = async(req,res)=>{
    
    try {
        const tips = await Tip.find({ availability : 'Public'})
        return res.status(200).send({
            message: 'tips fetched',
            tips,
            success: false
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false
        });
    }
}

const likeTip = async (req, res) => {
    const { id } = req.params;

    try {
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



module.exports ={
    createTip,
    updateTip,
    myTips,
    tipsDetails,
    browseTips,
    likeTip
}