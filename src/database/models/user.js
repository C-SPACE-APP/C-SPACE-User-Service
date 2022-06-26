const mongoose = require('mongoose')

const User = new mongoose.Schema({
  googleId: {
    type: String
  },
  email: {
    type: String, 
    immutable: true, 
    required: [true, "Missing email"]
  },
  givenName: {
    type: String, 
    immutable: true, 
    required: [true, "Missing given name"]
  },
  lastName: {
    type: String, 
    immutable: true, 
    required: [true, "Missing lastName"]
  },
  photo: {
    type: String,
    default: null,
  },
  username: {
    type: String, 
    default: 'user'
  },
  password: {
    type: String,
    default: null
  },
  batch: {
    type: String,
    default: null,
  },
  college: {
    type: String,
    default: null
  },
  course: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date, 
    default: Date.now, 
    immutable: true
  },
  updatedAt: {
    type: Date, 
    default: Date.now
  },
});

User.pre("save", function(next) {
  const user = this;

  if(user.isModified('course') && typeof user.course === 'string') {
    user.course = user.course.toUpperCase()
  }

  user.updatedAt = Date.now()
  return next()
});

module.exports = mongoose.model('User', User)