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
	return [  calculateTotalProfit, calculateTotal ];
};
