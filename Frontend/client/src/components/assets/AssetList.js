import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import AssetsCells from './AssetsCells';
import { Link } from 'react-router-dom';
import { Header, Table, Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { GlobalContext } from '../../context/GlobalState';
import ConfirmModal from '../layout/ConfirmModal';
import { calculate } from '../../utils/calculate';

function AssetList() {
	const { user } = useContext(GlobalContext);
	const [ assets, setAssets ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ assetId, setAssetId ] = useState('');
	const [ confirmDeleteModal, setConfirmDeleteModal ] = useState(false);
	const [ confirmDelete, setConfirmDelete ] = useState(false);
	const [ sortDirection, setSortDirection ] = useState(true);
	const [ calculateTotalProfit, calculateTotal, styleGainAndLose, calculateProfit ] = calculate();
	const [ mobile, setMobile ] = useState(false);

	const setResponsive = () => {
		if (window.innerWidth <= 960) {
			setMobile(true);
		} else {
			setMobile(false);
		}
	};

	useEffect(() => {
		setResponsive();
	}, []);

	window.addEventListener('resize', setResponsive);

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
	const onDelete = (assetId) => {
		setConfirmDeleteModal(true);
		setAssetId(assetId);
	};

	const sortAssets = (datatype) => {
		const sortedAssets = assets.sort(function(a, b) {
			if (sortDirection) {
				if (a[datatype] < b[datatype]) {
					return -1;
				}
				if (a[datatype] > b[datatype]) {
					return 1;
				}
				return 0;
			} else {
				if (a[datatype] > b[datatype]) {
					return -1;
				}
				if (a[datatype] < b[datatype]) {
					return 1;
				}
				return 0;
			}
		});
		setAssets(() => [ ...sortedAssets ]);
	};

	return (
		<div>
			{mobile ? (
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
						<div style={{ marginTop: '10px' }}>
							<Header as="h4" color="grey" style={{ marginTop: '10px' }}>
								Please click the coins to get details
							</Header>
							<Table celled unstackable textAlign="center" className="table-assets">
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Asset</Table.HeaderCell>
										<Table.HeaderCell>My profits</Table.HeaderCell>
										<Table.HeaderCell />
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{assets.map((asset) => (
										<Table.Row key={asset.id}>
											<Table.Cell>
												{asset.hourly_price.length > 1 && (
													<Link
														to={{
															pathname: '/myassets/chart',
															state: { asset }
														}}
													>
														<Header as="h5">{asset.name}</Header>
													</Link>
												)}
											</Table.Cell>

											<Table.Cell width="2" textAlign="center">
												{asset.hourly_price && calculateProfit(asset.price, asset)}
											</Table.Cell>

											<Table.Cell>
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
			) : (
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
						<div className="tables" style={{ marginTop: '10px' }}>
							<Table celled unstackable textAlign="center">
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell
											className="header_cell"
											onClick={() => {
												setSortDirection((prevSt) => !prevSt);
												sortAssets('name');
											}}
										>
											Asset {sortDirection ? <span>&#x2B9D;</span> : <span>&#x2B9F; </span>}
										</Table.HeaderCell>
										<Table.HeaderCell
											className="header_cell"
											onClick={() => {
												setSortDirection((prevSt) => !prevSt);
												sortAssets('price');
											}}
										>
											Purchase Price{' '}
											{sortDirection ? <span>&#x2B9D;</span> : <span>&#x2B9F; </span>}
										</Table.HeaderCell>
										<Table.HeaderCell
											className="header_cell"
											onClick={() => {
												setSortDirection((prevSt) => !prevSt);
												sortAssets('amount');
											}}
										>
											Amount {sortDirection ? <span>&#x2B9D;</span> : <span>&#x2B9F; </span>}
										</Table.HeaderCell>
										<Table.HeaderCell
											className="header_cell"
											onClick={() => {
												setSortDirection((prevSt) => !prevSt);
												sortAssets('dateOfPurchase');
											}}
										>
											Purchase Date{' '}
											{sortDirection ? <span>&#x2B9D;</span> : <span>&#x2B9F; </span>}
										</Table.HeaderCell>

										<Table.HeaderCell>Current Price</Table.HeaderCell>
										<Table.HeaderCell>My profits</Table.HeaderCell>
										<Table.HeaderCell>More details</Table.HeaderCell>
										<Table.HeaderCell width="1" />
									</Table.Row>
								</Table.Header>

								<Table.Body>
									{assets.map((asset) => <AssetsCells asset={asset} onDelete={onDelete} />)}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell>
											<Header as="h4">Total: </Header>
										</Table.HeaderCell>
										<Table.HeaderCell>
											{calculateTotal(assets, 'price').toFixed(3)} €
										</Table.HeaderCell>
										<Table.HeaderCell>{calculateTotal(assets, 'amount')} Coins</Table.HeaderCell>
										<Table.HeaderCell> -- </Table.HeaderCell>
										<Table.HeaderCell> -- </Table.HeaderCell>
										<Table.HeaderCell>{calculateTotalProfit(assets).toFixed(3)} €</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</div>
					) : (
						<h3>Please add a new asset</h3>
					)}
				</div>
			)}
		</div>
	);
}

export default AssetList;
