const mongoose = require('mongoose');
const { regExpUrl } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Необходимо ввести имя карточки'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Необходимо ввести ссылку на изображение'],
    validate: {
      validator(v) {
        return regExpUrl.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  crearedAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
