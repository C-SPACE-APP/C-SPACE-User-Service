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

User.pre("save", async function(next) {
  const user = this;

  if(user.isModified('course') && typeof user.course === 'string') {
    user.course = user.course.toUpperCase()
  }

  if(user.isNew) {
    const users = await mongoose.model('User', User).find({
      username: { $regex: new RegExp('^c-spacer[0-9]{4}$') }
    })
    .sort({ username: -1 })

    if(users.length === 0) {
      user.username = "c-spacer0000"
    }
    else {
      const code = users[0].username.replace(/c-spacer/g, "")
      const number = String(parseInt(code) + 1)
      const newUsername = `c-spacer${'0'.repeat(4-number.length)}${number}`
      user.username = newUsername
    }
  }

  user.updatedAt = Date.now()
  return next()
});

module.exports = mongoose.model('User', User)