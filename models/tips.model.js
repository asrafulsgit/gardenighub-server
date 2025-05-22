const mongoose = require('mongoose');

const GardeningTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  plantType: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: 
    {
      type: String,
      required : true
    }
  ,
  category: {
    type: String,
    enum: ['Composting', 
      'Plant Care', 
      'Vertical Gardening', 
      'Soil Health', 
      'Hydroponics',
      'Indoor Gardening',
      'Organic Gardening',
      'Container Gardening'
    ],
    required: true
  },
  availability: {
    type: String,
    enum: ['Public', 'Hidden'],
    required: true
  },
  likes : {type : Number, default : 0},
  user: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      immutable: true 
    },
    name: {
      type: String,
      required: true,
      trim: true,
      immutable: true 
    },
    photo: {
      type: String,
      default: 'https://i.ibb.co.com/hRGTZWdX/download.jpg',
      immutable: true 
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GardeningTip', GardeningTipSchema);
