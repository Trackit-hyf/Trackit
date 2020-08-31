const mongoose = require('mongoose');

const User = require('../models/user');

const registerAssets = async (req, res, next) => {
	const { id, name, price, amount, dateOfPurchase } = req.body;
	const uid = req.params.uid;

	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}

	if (user.firebaseId !== req.userData.firebaseId) {
		res.status(500).json({
			msg: 'You are not allowed to modify assets for this user'
		});
	}

	const newAsset = {
		id,
		name,
		price,
		amount,
		dateOfPurchase
	};
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await user.save({ session });
		user.assets.push(newAsset);
		await user.save({ session });
		await session.commitTransaction();
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
	const { id, name, price, amount, dateOfPurchase } = req.body;
	const uid = req.params.uid;
	const aId = req.params.assetId;

	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}

	if (user.firebaseId !== req.userData.firebaseId) {
		res.status(500).json({
			msg: 'You are not allowed to modify assets for this user'
		});
	}

	const assetToModify = user.assets.id(aId);
	assetToModify['id'] = id;
	assetToModify['name'] = name;
	assetToModify['price'] = price;
	assetToModify['amount'] = amount;
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

	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}

	if (user.firebaseId !== req.userData.firebaseId) {
		res.status(500).json({
			msg: 'You are not allowed to get assets for this user'
		});
	}
	res.status(201).json({
		userAssets: user.assets
	});
};

const deleteAssets = async (req, res, next) => {
	const uid = req.params.uid;
	const aId = req.params.assetId;

	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Something went wrong, could not register assets.'
		});
		return next(error);
	}

	if (user.firebaseId !== req.userData.firebaseId) {
		res.status(500).json({
			msg: 'You are not allowed to modify assets for this user'
		});
	}

	const assetsExists = user.assets.find((asset) => asset._id.toString() === aId);

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
