import React from 'react';

export const calculate = () => {
	const calculateTotalProfit = (assets) => {
		if (assets) {
			const totalProfitArr = assets.map(
				(asset) => (asset.hourly_price[asset.hourly_price.length - 1].price - asset.price) * asset.amount
			);
			const totalAssetProfit = totalProfitArr.reduce((a, b) => {
				return a + b;
			}, 0);
			return totalAssetProfit;
		}
	};
	const calculateTotal = (assets, key) => {
		if (assets) {
			const totalAssetArr = assets.map((asset) => asset[key]);
			const totalAsset = totalAssetArr.reduce((a, b) => {
				return a + b;
			}, 0);
			return totalAsset;
		}
	};

	const styleGainAndLose = (priceA, priceB) => {
		if (priceA > priceB) {
			return <p className="priceIncrease "> &#x2B9D; {priceA}</p>;
		} else if (priceA < priceB) {
			return <p className="priceDecrease "> &#x2B9F; {priceA}</p>;
		} else {
			return <p className="priceNoChange "> {priceA}</p>;
		}
	};
	const calculateProfit = (purchasePrice, asset) => {
		const amount = asset.amount;
		const currentPrice = asset.hourly_price[asset.hourly_price.length - 1].price;
		const difference = (currentPrice - purchasePrice) * amount;
		return difference < 0 ? (
			<p className="priceDecrease"> {difference.toFixed(3)}</p>
		) : (
			<p className="priceIncrease">{difference.toFixed(3)}</p>
		);
	};
	return [ calculateTotalProfit, calculateTotal, styleGainAndLose, calculateProfit ];
};
