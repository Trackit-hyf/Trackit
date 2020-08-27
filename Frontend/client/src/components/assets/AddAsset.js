import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

function AddAsset() {
  const [asset, setAsset] = useState({
    assetName: '',
    assetPrice: '',
    assetAmount: ''
  });
  const { addAsset } = useContext(GlobalContext);
  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setAsset((oldAsset) => ({ ...oldAsset, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newAsset = {
      assetId: uuidv4(),
      ...asset
    };
    addAsset(newAsset);
    history.push('/myassets');
  }
  console.log(asset);

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='grey' textAlign='center'>
          Add new asset
        </Header>

        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='amazon'
              iconPosition='left'
              placeholder='Asset Name'
              name='assetName'
              value={asset.assetName}
              onChange={onChange}
              required
            />

            <Form.Input
              fluid
              icon='dollar sign'
              iconPosition='left'
              placeholder='Price'
              name='assetPrice'
              type='number'
              value={asset.assetPrice}
              onChange={onChange}
              required
            />

            <Form.Input
              fluid
              icon='dolly'
              iconPosition='left'
              placeholder='Amount'
              name='assetAmount'
              type='number'
              value={asset.assetAmount}
              onChange={onChange}
              required
            />

            <Button inverted color='orange'>
              Add Asset
            </Button>

            <Link to='/myassets'>
              <Button inverted color='red'>
                Cancel
              </Button>
            </Link>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default AddAsset;
