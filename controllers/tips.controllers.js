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
    const {email} =req.quary;
    try {
        console.log(email)
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Something broke!',
            success: false
        });
    }
}

const updateTip = async (req, res) => {
    const { tip } = req.body;
    try {
        const { _id, title, plantType, diffifulty, description, image, category, availability } = tip;

        const updatedTip = await Tip.findByIdAndUpdate(
            _id,
            {
                title,
                plantType,
                diffifulty,
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





module.exports ={
    createTip,
    updateTip,
    myTips
}