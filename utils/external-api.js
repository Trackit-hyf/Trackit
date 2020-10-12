const User = require('../models/user');
const cron = require('node-cron');
const axios = require('axios');

const updateCryptoCoins = async () => {
	cron.schedule('* * * * *',async () => {
		console.log('start');
	let users;
	try {
		users = await User.find({});
	} catch (err) {
		console.log(err);
	}
	console.log(users);
	users.forEach(async (user) => {
		user.assets.forEach(async (asset) => {
			//if the asset is crypto coin => update it..
			const Url = `https://api.coingecko.com/api/v3/coins/${asset.id}`;
			let priceEuro;
			try {
				const response = await axios.get(Url);
				priceEuro = await response.data.market_data.current_price.eur;
			} catch (error) {
				console.log(error);
			}
			const hourlyPrice = {
				price: priceEuro,
				date: new Date()
			};
			asset.hourly_price.push(hourlyPrice);
			console.log(asset.hourly_price);
			try {
				await user.save();
			} catch (err) {
				console.log(err);
			}
		});
	
	});

	});
};


module.exports = updateCryptoCoins;




