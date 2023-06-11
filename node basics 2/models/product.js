const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	sellerName: String,
	sellerAddress: String,
	sellerPhone: Number,
	inStock: Boolean,
	color: {
		type: String,
		default: 'black'
	}
});

const productModel = mongoose.model('productInfo', productSchema);
module.exports = productModel;
