const mongoose = require('mongoose');

const gardenerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
  experiences: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, 
    default: ''
  },
  totalSharedTips: {
    type: Number,
    default: 0
  },
  experties : {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
 reviews:{
    type: Number,
    default: 0
},
  bio: {
    type: String,
    default: '',
    trim: true
  },
  
},{timestamps : true});

const Gardener = mongoose.model('Gardener', gardenerSchema);

module.exports = Gardener;
