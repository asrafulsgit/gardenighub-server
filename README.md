# 🌿 GardenHub - Server

## ✅ Overview

This is the backend/server-side of the **GardeningHub** web application. It is built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for managing gardening tips, gardeners, blogs, comments, and more.

---

## 🚀 Features

- User Authentication 
- Gardening Tips CRUD
- Blog Post Management
- Comment System
- MongoDB Integration
- Error Handling & Validation

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Dotenv
- CORS

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/asrafulsgit/gardenhub-server
cd server
npm install
npm run dev
```

## 🔒 Authentication

- Email and Password authentication 
- Firebase used for Google OAuth  
- Protected routes for user using middleware

---

## 🚀 Deployment
- **Backend**: Vercel  
- **Database**: MongoDB Atlas

---

## 🧩 tip Model (Mongoose Schema)

```js
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

GardeningTipSchema.index({ createdAt: -1 }); 

module.exports = mongoose.model('GardeningTip', GardeningTipSchema);
```

