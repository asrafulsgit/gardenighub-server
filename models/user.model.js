const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
     avatar : {
          type : String,
          default : 'https://i.ibb.co/hRGTZWdX/download.jpg'
     },
     name :{
          type : String,
          required : [true, 'name is required!'],
          trim : true
     },
     email :{
          type : String,
          required : [true, 'email is required!'],
          unique : true,
          trim : true,
     },
     password :{
          type : String,
          required : function(){
               return !this.google;
          },
          trim : true
     },
     google : {type : Boolean, default : false}
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User ;