const Tip = require("../models/tips.model");


const createTip =async(req,res)=>{
    const {tip} = req.body;
    try {
        const {title,plantType,diffifulty,description,image,category,availability,user} = tip;
        const newTip = new Tip({
            title,
            plantType,
            diffifulty,
            description,
            image,
            category,
            availability,
            user
        })
        await newTip.save();
         return res.status(201).send({
            message : 'tip successfully created.',
            success : true
        })
    } catch (error) {
         return res.status(500).send({
            message : 'something borke!',
            success : false
        })
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
    updateTip
}