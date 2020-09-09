import React, { useContext, useState } from 'react';
import Axios from 'axios';
import {
  Header,
  Table,
  Button,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react';
import moment from 'moment';
import { GlobalContext } from '../../context/GlobalState';
import { useEffect } from 'react';

function AssetList() {
  const { user } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getAssets() {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const response = await Axios.get(
        `/api/assets/myAssets/${user.userId}`,
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

  useEffect(() => {
    if (assetId) deleteAsset();

    async function deleteAsset() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        await Axios.delete(
          `/api/assets/delete-assets/${user.userId}/${assetId}`,
          config
        );
        getAssets();
      } catch (error) {
        setError(true);
      }
    }
  }, [assetId]);

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : error ? (
        <Message
          error
          header='Oops!'
          content='Something went wrong with getting assets'
        />
      ) : assets.length > 0 ? (
        <Table celled unstackable textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Date of Purchase</Table.HeaderCell>
              <Table.HeaderCell width='1'></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {assets.map((asset) => (
              <Table.Row key={asset.id}>
                <Table.Cell width='2'>
                  <Header as='h4'>{asset.name}</Header>
                </Table.Cell>

                <Table.Cell width='2' textAlign='center'>
                  ${asset.price}
                </Table.Cell>

                <Table.Cell width='2' textAlign='center'>
                  ${asset.amount}
                </Table.Cell>

                <Table.Cell width='2' textAlign='center'>
                  {moment(asset.dateOfPurchase).format('DD/MM/YYYY')}
                </Table.Cell>

                <Table.Cell width='1' textAlign='center'>
                  <Button
                    circular
                    icon='delete'
                    size='mini'
                    inverted
                    color='red'
                    onClick={() => {
                      setAssetId(asset._id);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <h3>Please add a new asset</h3>
      )}
    </>
  );
}

export default AssetList;
