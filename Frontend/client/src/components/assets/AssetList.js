import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Table, Button, Dimmer, Loader, Message, Modal, Icon } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import { GlobalContext } from '../../context/GlobalState';
import { useEffect } from 'react';
import ConfirmModal from '../layout/ConfirmModal';

function AssetList() {
	const { user } = useContext(GlobalContext);
	const [ assets, setAssets ] = useState([]);
	const [ assetId, setAssetId ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ confirmDeleteModal, setConfirmDeleteModal ] = useState(false);
	const [ confirmDelete, setConfirmDelete ] = useState(false);

	async function getAssets() {
		try {
			setLoading(true);
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			const response = await Axios.get(
				`${process.env.REACT_APP_BACKEND}/api/assets/myAssets/${user.userId}`,
				config
			);
			setAssets(response.data.userAssets);
			setLoading(false);
		} catch (error) {
			setError(true);
		}
	}
	useEffect(() => {
		getAssets();
	}, []);

	useEffect(
		() => {
			if (assetId && confirmDelete) deleteAsset();
			async function deleteAsset() {
				try {
					const config = {
						headers: { Authorization: `Bearer ${user.token}` }
					};
					await Axios.delete(
						`${process.env.REACT_APP_BACKEND}/api/assets/delete-assets/${user.userId}/${assetId}`,
						config
					);
					getAssets();
				} catch (error) {
					setError(true);
				}
			}
		},
		[ assetId, confirmDelete ]
	);
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
	return (
		<div>
			<ConfirmModal
				show={confirmDeleteModal}
				message="You will not be able to track your asset if you delete it!"
				confirm={setConfirmDelete}
				onClose={setConfirmDeleteModal}
			/>
			{loading ? (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			) : error ? (
				<Message error header="Oops!" content="Something went wrong with getting assets" />
			) : assets.length > 0 ? (
				<div>
					<Table celled unstackable textAlign="center">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Asset</Table.HeaderCell>
								<Table.HeaderCell>Buy Price</Table.HeaderCell>
								<Table.HeaderCell>Amount</Table.HeaderCell>
								<Table.HeaderCell>Date of Purchase</Table.HeaderCell>
								<Table.HeaderCell>Current Price</Table.HeaderCell>
								<Table.HeaderCell>My profits</Table.HeaderCell>
								<Table.HeaderCell>More details</Table.HeaderCell>
								<Table.HeaderCell width="1" />
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{assets.map((asset) => (
								<Table.Row key={asset.id}>
									<Table.Cell width="2">
										<Header as="h4">{asset.name}</Header>
									</Table.Cell>
									<Table.Cell width="2" textAlign="center">
										{asset.price}
									</Table.Cell>
									<Table.Cell width="2" textAlign="center">
										{asset.amount}
									</Table.Cell>

									<Table.Cell width="2" textAlign="center">
										{formatDate(asset.dateOfPurchase)}
									</Table.Cell>
									<Table.Cell width="2" textAlign="center">
										{asset.hourly_price.length > 1 ? (
											styleGainAndLose(
												asset.hourly_price[asset.hourly_price.length - 1].price,
												asset.hourly_price[asset.hourly_price.length - 2].price
											)
										) : (
											<p className="priceNoChange">{asset.hourly_price[0] && asset.hourly_price[0].price}</p>
										)}
									</Table.Cell>
									<Table.Cell width="2" textAlign="center">
										{asset.hourly_price && calculateProfit(asset.price, asset)}
									</Table.Cell>
									<Table.Cell width="2" textAlign="center" style={{ textDecoration: 'underline' }}>
										{asset.hourly_price.length > 1 && (
											<Link
												to={{
													pathname: '/myassets/chart',
													state: { asset }
												}}
											>
												Price late changes
											</Link>
										)}
									</Table.Cell>
									<Table.Cell width="1" textAlign="center">
										<Button
											circular
											icon="delete"
											size="mini"
											inverted
											color="red"
											onClick={() => {
												setConfirmDeleteModal(true);
												setAssetId(asset._id);
											}}
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			) : (
				<h3>Please add a new asset</h3>
			)}
		</div>
	);
}

export default AssetList;
