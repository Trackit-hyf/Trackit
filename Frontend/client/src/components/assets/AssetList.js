import React, { useContext } from 'react';
import { Header, Table, Icon, Button } from 'semantic-ui-react';
import { GlobalContext } from '../../context/GlobalState';

function AssetList() {
  const { assets, removeAsset } = useContext(GlobalContext);
  console.log(assets);

  return (
    <>
      <Table celled unstackable textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Asset</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell width='1'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {assets.map((asset) => (
            <Table.Row key={asset.id}>
              <Table.Cell width='2'>
                <Header as='h4'>
                  <Icon name='apple' />
                  {asset.name}
                </Header>
              </Table.Cell>

              <Table.Cell width='2' textAlign='center'>
                ${asset.price}
              </Table.Cell>

              <Table.Cell width='2' textAlign='center'>
                ${asset.amount}
              </Table.Cell>

              <Table.Cell width='1' textAlign='center'>
                <Button
                  circular
                  icon='delete'
                  size='mini'
                  inverted
                  color='red'
                  onClick={() => removeAsset(asset.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default AssetList;
