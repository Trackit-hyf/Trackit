const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	firebaseId: { type: String, required: true },
	assets: [{ 
		assetId: {type: String , required: true,}, 
		assetName: {type: String, required: true,},
		assetPrice : {type: Number, required: true,}, 
		assetAmount: {type: Number, required: true,}, 
		dateOfPurchase: { type: Date , required: true,}
	}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
