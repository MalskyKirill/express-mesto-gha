const mongoose = require('mongoose');
const User = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    manlength: 2,
    mixlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: [],
      require: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
