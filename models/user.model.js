const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  photo: {
    type: String,
    default: 'https://i.ibb.co.com/hRGTZWdX/download.jpg',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
