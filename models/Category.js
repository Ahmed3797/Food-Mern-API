const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl:{type:String,required:true}
});

const Category = mongoose.model('Categories', categorySchema);

module.exports = Category;
