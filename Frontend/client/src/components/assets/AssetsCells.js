import React from 'react';
import { Header, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { calculate } from '../../utils/calculate';
import formatDate from '../../utils/formatDate';

export default function AssetsCells({ asset, onDelete }) {
	const [ calculateTotalProfit, calculateTotal, styleGainAndLose, calculateProfit ] = calculate();

	return (
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
			<Table.Cell
				width="2"
				textAlign="center"
				style={{
					textDecoration: 'underline',
					color: 'orangered'
				}}
			>
				<Link
					to={{
						pathname: '/myassets/chart',
						state: { asset }
					}}
				>
					Price late changes
				</Link>
			</Table.Cell>
			<Table.Cell width="1" textAlign="center">
				<Button circular icon="delete" size="mini" inverted color="red" onClick={() => onDelete(asset._id)} />
			</Table.Cell>
		</Table.Row>
	);
}
