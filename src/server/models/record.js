const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordModel = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  createdAt: Date
});

const Record = new mongoose.model('Record', recordModel);

module.exports = Record;