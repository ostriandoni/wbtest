const mongoose = require('mongoose')

const JokesSchema = new mongoose.Schema({
  ext_id: {
    type: Number,
    required: true,
    unique: true,
  },
  joke: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('jokes', JokesSchema)
