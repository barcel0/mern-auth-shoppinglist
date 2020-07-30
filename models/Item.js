const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
  name: {type: String, required: true}
}, {timestamps: true});

module.exports = Item = mongoose.model('Item', ItemSchema);