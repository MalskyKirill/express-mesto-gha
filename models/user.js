const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: 'Жак-Ив Кусто',
    manlength: 2,
    mixlength: 30,

  },
  about: {
    type: String,
    require: true,
    default: 'Исследователь океана',
    mailength: 2,
    mixlength: 30,
  },
  awatar: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('user', userSchema);
