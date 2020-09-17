import React from 'react';
import { Link } from 'react-router-dom';
import AssetList from './AssetList';
import { Button, Icon, Header, Image, Divider } from 'semantic-ui-react';
import wallet from '../../img/wallet.jpg';

function MyAssets() {
  return (
    <div>
      <Divider />

      <Header as='h2' color='grey'>
        <Image circular src={wallet} />
        My Assets
      </Header>

      <Link to='/myassets/add'>
        <Button color='orange' size='small'>
          <Icon name='plus' />
          Add new asset
        </Button>
      </Link>
      <AssetList />
    </div>
  );
}

export default MyAssets;
