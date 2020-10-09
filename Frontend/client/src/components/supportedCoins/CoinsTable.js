import React from 'react'
import { Divider, Header, Image, Table } from 'semantic-ui-react'


export default function CoinsTable(props) {
    
    return (
        <div>
        <Divider/> 
           <Table celled  unstackable collapsing style={{margin: 'auto'}}>
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
          {props.coins && props.coins.map(coin=>
           <Table.Body>
             <Table.Row>
               <Table.Cell>
                 <Header as='h4' image>
                   <Image src={coin && coin.image.thumb}rounded size='mini' />
                   <Header.Content>
                     {coin.symbol}
                     <Header.Subheader>{coin.name}</Header.Subheader>
                   </Header.Content>
                 </Header>
               </Table.Cell>
               <Table.Cell>{coin && coin.market_data.current_price.eur}</Table.Cell>
               <Table.Cell>{coin && coin.market_data.low_24h.eur}</Table.Cell>
          <Table.Cell>{coin && coin.market_data.high_24h.eur}</Table.Cell>
               <Table.Cell>{coin && coin.market_data && coin.market_data.price_change_24h_in_currency.eur}</Table.Cell>
               <Table.Cell>{coin && coin.market_data && coin.market_data.market_cap.eur}</Table.Cell>
             </Table.Row>
            
           </Table.Body>
          )}
          </Table>
          </div>
    )
}
