import React, { useState, useEffect } from 'react';

import { Divider, Header, Image, Table, Icon } from 'semantic-ui-react';

export default function CoinsTable(props) {
  const [mobile, setMobile] = useState(false);

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
  return (
    <>
      {mobile ? (
        <div>
          <Divider />
          <Header
            as='h4'
            color='grey'
            style={{ marginTop: '50px', marginLeft: '50px' }}
          >
            <Icon.Group size='large' style={{ marginRight: '10px' }}>
              <Icon color='orange' size='small' name='shopping cart' />
              <Icon corner name='btc' />
            </Icon.Group>
            You can invest in most valuable coins
          </Header>
          <div className='tables' style={{ marginTop: '10px' }}>
            <Table celled unstackable collapsing style={{ margin: 'auto' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Coin</Table.HeaderCell>
                  <Table.HeaderCell>Price(EUR) </Table.HeaderCell>
                  <Table.HeaderCell>Price Change(24h)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {props.coins &&
                props.coins.map((coin) => (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Image
                            src={coin && coin.image.thumb}
                            rounded
                            size='mini'
                          />
                          <Header.Content>
                            {coin.symbol}
                            <Header.Subheader>{coin.name}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {coin && coin.market_data.current_price.eur}
                      </Table.Cell>
                      <Table.Cell>
                        {coin &&
                          coin.market_data &&
                          coin.market_data.price_change_24h_in_currency.eur.toFixed(
                            2
                          )}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      ) : (
        <div>
          <Divider />
          <Header
            as='h4'
            color='grey'
            style={{ marginTop: '50px', marginLeft: '50px' }}
          >
            <Icon.Group size='large' style={{ marginRight: '10px' }}>
              <Icon color='orange' size='small' name='shopping cart' />
              <Icon corner name='btc' />
            </Icon.Group>
            You can invest in most valuable coins
          </Header>
          <div className='tables' style={{ marginTop: '10px' }}>
            <Table celled unstackable collapsing style={{ margin: 'auto' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Coin</Table.HeaderCell>
                  <Table.HeaderCell>Price(EUR) </Table.HeaderCell>
                  <Table.HeaderCell>Low(24h) </Table.HeaderCell>
                  <Table.HeaderCell>High(24h) </Table.HeaderCell>
                  <Table.HeaderCell>Price Change(24h)</Table.HeaderCell>
                  <Table.HeaderCell>Market Cap </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {props.coins &&
                props.coins.map((coin) => (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Image
                            src={coin && coin.image.thumb}
                            rounded
                            size='mini'
                          />
                          <Header.Content>
                            {coin.symbol}
                            <Header.Subheader>{coin.name}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {coin && coin.market_data.current_price.eur}
                      </Table.Cell>
                      <Table.Cell>
                        {coin && coin.market_data.low_24h.eur}
                      </Table.Cell>
                      <Table.Cell>
                        {coin && coin.market_data.high_24h.eur}
                      </Table.Cell>
                      <Table.Cell>
                        {coin &&
                          coin.market_data &&
                          coin.market_data.price_change_24h_in_currency.eur}
                      </Table.Cell>
                      <Table.Cell>
                        {coin &&
                          coin.market_data &&
                          coin.market_data.market_cap.eur}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
