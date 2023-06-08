// 1. schema
// 2. Model
// 3. export model

const mongoose = require('mongoose');

// const variable = new mongoose.Schema(data);
// name -> string
// price -> number
// seller name -> string
// shop address -> string
// discount -> number
// isAvailable -> boolean
// qty -> number
const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	sellerName: String,
	shopAddress: String,
	discount: Number,
	isAvailable: Boolean,
	qty: Number
});

// const variable = mongoose.model(tableName, schema)
const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
