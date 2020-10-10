const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/user');

const registerAssets = async (req, res, next) => {
	const { id, name, price, amount, dateOfPurchase } = req.body;
	const uid = req.params.uid;
	console.log('rea', req.body);
	let user;
	try {
		user = await User.findById(uid);
	} catch (err) {
		res.status(500).json({
			msg: 'Could not register asset.'
		});
		return next(error);
	}

	const assetExists = user.assets.find(asset => asset.name === name)
	if(assetExists) {
		res.status(500).json({
			msg: 'Asset exists already. Please enter another asset or modify the one you have already!'
		});
		return next();
	}
	
	let supportedCoins;
	try {
		const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
		supportedCoins = response.data;
	} catch (err) {
		res.status(500).json({
			msg: 'Could not load supported coins.'
		});
		return next(error);
	}
	const coinExists = supportedCoins.find((supportedCoin) => supportedCoin.id === id.toLowerCase());

	if (coinExists) {
		if (user.firebaseId !== req.userData.firebaseId) {
			res.status(500).json({
				msg: 'Not authorized '
			});
		}
		const Url = `https://api.coingecko.com/api/v3/coins/${id}`;
			let priceEuro;
			try {
				const response = await axios.get(Url);
				priceEuro = await response.data.market_data.current_price.eur;
			} catch (error) {
				console.log('could not add hourly price' , error);
			}
			const hourlyPrice = {
				price: priceEuro,
				date: new Date()
			};
			
		const newAsset = {
			id,
			name,
			price,
			amount,
			dateOfPurchase, 
			hourly_price: hourlyPrice
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
			msg: "Asset is registered and will the price will be updated every hour.", 
			newAsset
		});
	} else {
		res.status(500).json({
			msg: 'Asset is not supported'
		});
	}
};

const modifyAsset = async (req, res, next) => {
	const {price, amount, dateOfPurchase } = req.body;
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
