const { Schema, model } = require('mongoose');

const lyricSchema = new Schema({
  lyrics: {
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
  }
});

const Lyric = model('Lyric', lyricSchema);
c

module.exports = Lyric;