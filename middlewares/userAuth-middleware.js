const jwt = require('jsonwebtoken');

const userAuthentication = async(req,res,next)=>{
     const {accesstoken} =req.cookies;
     try {
          if(!accesstoken){
               return res.status(404).send({
                    success : false,
                    message : 'Your token is expired. please, Login again!'
               })
          }
          const verifytoken =  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOEKN)
          req.user = verifytoken;
          next();
     } catch (error) {
          return res.status(500).send({
               success : false,
               message : 'somthing broke!'
          })
     }
}

module.exports = userAuthentication ;

