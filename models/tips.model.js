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
      'Container Gardening',
      'Pest Control'
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

GardeningTipSchema.index({ createdAt: -1 }); 

module.exports = mongoose.model('GardeningTip', GardeningTipSchema);
