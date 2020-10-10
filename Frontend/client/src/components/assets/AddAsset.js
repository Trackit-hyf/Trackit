import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { INITIAL_ASSET } from '../../config';

function AddAsset() {
	const { user } = useContext(GlobalContext);
	const [ asset, setAsset ] = useState(INITIAL_ASSET);
	const [ error, setError ] = useState(false);
	const [ coinList, setCoinList ] = useState();

	const history = useHistory();

	const onChange = (e) => {
		const { name, value } = e.target;
		setAsset((oldAsset) => ({ ...oldAsset, [name]: value }));
	};

	const onDropdownChange = (e, result) => {
		const { name, value } = result || e.target;
		setAsset((oldAsset) => ({ ...oldAsset, [name]: value }));
	};

	function handleSubmit(e) {
		e.preventDefault();
		registerAssets();
	}

	async function registerAssets() {
		try {
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};

			await Axios.post(
				`${process.env.REACT_APP_BACKEND}/api/assets/register-assets/${user.userId}`,
				asset,
				config
			);

			history.push('/myassets');
		} catch (error) {
			setError(true);
		}
  }
  
	// Set asset id from dropdown menu
	function setAssetId() {
		coinList &&
			coinList.find((coin) => {
				if (coin.value === asset.name) {
					return setAsset({
						...asset,
						id: coin.id
					});
				}
			});
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Axios.get('https://api.coingecko.com/api/v3/coins/');
				setCoinList(
					response.data.map((asset) => {
						return { id: asset.id, text: asset.name, value: asset.name };
					})
				);
			} catch (error) {
				setError(true);
			}
		};
		fetchData();
	}, []);

	useEffect(
		() => {
			setAssetId();
		},
		[ asset.name, asset.id ]
	);
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="grey" textAlign="center">
					Add new asset
				</Header>

				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Dropdown
							selection
							search
							options={coinList}
							name="name"
							placeholder="name"
							value={asset.name}
							onChange={onDropdownChange}
							onClick={() => setAssetId()}
							fluid
							required
						/>

						<Form.Input
							fluid
							icon="dollar sign"
							iconPosition="left"
							placeholder="Price"
							name="price"
							type="number"
							value={asset.price}
							onChange={onChange}
							required
						/>

						<Form.Input
							fluid
							icon="dolly"
							iconPosition="left"
							placeholder="Amount"
							name="amount"
							type="number"
							value={asset.amount}
							onChange={onChange}
							required
						/>

						<Form.Input
							fluid
							icon="calendar alternate outline"
							iconPosition="left"
							placeholder="date of purchase"
							name="dateOfPurchase"
							type="date"
							value={asset.dateOfPurchase}
							onChange={onChange}
							required
						/>

						<Button inverted color="orange">
							Add Asset
						</Button>

						<Link to="/myassets">
							<Button inverted color="red">
								Cancel
							</Button>
						</Link>

						{error && <Message error header="Oops!" content="Something went wrong with adding asset" />}
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
}

export default AddAsset;
