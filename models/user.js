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
  avatar: {
    type: String,
    require: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);
