const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  content: {
    type: String,
    trim: true
  },
  lyric_order: {
    type: Number
  },
  song: {
    type: String
  },
  duration: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Lyric', LyricSchema)
