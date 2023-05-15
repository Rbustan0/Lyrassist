const { Schema, model } = require('mongoose');

const lyricSchema = new Schema({
  lyricText: {
    type: String,
    required: true,
  },
  verse: {
    type: Boolean,
    default: true,
  },
  bridge: {
    type: Boolean,
    default: false,
  },
  chorus: {
    type: Boolean,
    default: true,
  },
  preChorus: {
    type: Boolean,
    default: false,
  },
  prompt: {
    type: String,
    required: true,
  },
  genre: {
    type: String
  }
});

const Lyric = model('Lyric', lyricSchema);

module.exports = Lyric;