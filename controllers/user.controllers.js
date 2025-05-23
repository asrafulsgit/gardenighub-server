const User = require('../models/user.model')

const createUser = async(req,res)=>{
    const {name,email,photo} = req.body;
    try {
        const user = new User({
            name,
            email,
            photo
        })

        await user.save();
        return res.status(201).send({
            message : 'user successfully created.',
            success : true
        })
    } catch (error) {
        return res.status(500).send({
            message : 'something borke!',
            success : false,
            error : error.message
        })
    }
}


module.exports={
    createUser
}