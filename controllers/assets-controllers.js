
const mongoose = require('mongoose');

const User = require('../models/user');

const registerAssets = async (req, res, next) => {
	const { assetId, assetName, assetPrice, assetAmount, dateOfPurchase } = req.body;
	const uid = req.params.uid;
	//find the user in MongoDB
	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}
	//check if it is a request from the same user
	if(user.firebaseId !== req.userData.firebaseId){
		res.status(500).json({
			msg: "You are not allowed to modify assets for this user"
		});
	}

	const newAsset = {
		assetId,
		assetName,
		assetPrice,
		assetAmount,
		dateOfPurchase
	};
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.save({ session: sess });
		user.assets.push(newAsset);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets in database.'
		});
		return next(err);
	}

	res.status(201).json({
		userAssets: user.assets
	});
};

const modifyAsset = async (req, res, next) => {
	const { assetId, assetName, assetPrice, assetAmount, dateOfPurchase } = req.body;
	const uid = req.params.uid;
	const aId = req.params.assetId;

	//find the user in MongoDB
	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}

	//check if it is a request from the same user
	if(user.firebaseId !== req.userData.firebaseId){
		res.status(500).json({
			msg: "You are not allowed to modify assets for this user"
		});
	}

	const assetToModify = user.assets.id(aId);
	assetToModify['assetId'] = assetId;
	assetToModify['assetName'] = assetName;
	assetToModify['assetPrice'] = assetPrice;
	assetToModify['assetAmount'] = assetAmount;
	assetToModify['dateOfPurchase'] = dateOfPurchase;

	try {
		await user.save();
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets in database.'
		});
		return next(err);
	}

	res.status(201).json({
		userAssets: user.assets
	});
};

const getMyAssets = async (req, res, next) => {
	const uid = req.params.uid;
	//find the user in MongoDB
	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}
	//check if it is a request from the same user
	if(user.firebaseId !== req.userData.firebaseId){
		res.status(500).json({
			msg: "You are not allowed to get assets for this user"
		});
	}
	res.status(201).json({
		userAssets: user.assets
	});
};

const deleteAssets = async (req, res, next) => {
	const uid = req.params.uid;
	const aId = req.params.assetId;

	//find the user in MongoDB
	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}
	//check if it is a request from the same user
	if(user.firebaseId !== req.userData.firebaseId){
		res.status(500).json({
			msg: "You are not allowed to modify assets for this user"
		});
	}
	
	const assetsExists = user.assets.find((asset) => asset.id === aId);

	if (assetsExists) {
		try {
			user.assets.remove(aId);
			await user.save();
		} catch (err) {
			res.status(500).json({
				msg: 'Something went wrong, could not delete assets in database.'
			});
			return next(err);
		}
		res.status(201).json({
			msg: 'asset was deleted successfully!'
		});
	} else {
		res.status(404).json({
			msg: "asset doesn't exist!"
		});
	}
};

exports.registerAssets = registerAssets;
exports.modifyAsset = modifyAsset;
exports.getMyAssets = getMyAssets;
exports.deleteAssets = deleteAssets;
