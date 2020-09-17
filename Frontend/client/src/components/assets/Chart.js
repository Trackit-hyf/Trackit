import React from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Icon, Divider, Header, Image } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import moment from 'moment';

function Chart() {
  let location = useLocation();

  const {
    amount,
    dateOfPurchase,
    name,
    price,
    hourly_price
  } = location.state.asset;

  let updatedPrices = hourly_price.map((hour) => hour.price);
  if (updatedPrices.length < 1) updatedPrices = undefined;

  const purchaseDate = formatDate(dateOfPurchase);

  const updatedDates = hourly_price.map((updatedInfo) => updatedInfo.date);
  const updatedDatesInFormat = updatedDates.map((date) => formatDate(date));

  const data = {
    labels: [purchaseDate, ...updatedDatesInFormat],
    datasets: [
      {
        label: `${name} data`,
        data: [price, ...updatedPrices],
        fill: false,
        borderColor: '#F15C3C'
      }
    ]
  };

  const options = {
    maintainAspectRatio: false //
  };

  return (
    <>
      <Divider />

      <Header as='h4' color='grey'>
        <Icon circular name='line graph' />
        {name}
      </Header>
      <Link to='/myassets'>
        <Button color='orange' size='mini'>
          <Icon name='arrow left' />
          Back to MyAsset
        </Button>
      </Link>
      <article className='canvas-container'>
        <Line data={data} options={options} />
      </article>
    </>
  );
}

export default Chart;
