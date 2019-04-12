const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  player: {
    type: String,
    trim: true
  },
  score: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('Song', SongSchema)
