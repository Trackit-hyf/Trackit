import React from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Icon, Divider, Header, Container } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

function Chart() {
  let location = useLocation();

  const { dateOfPurchase, name, price, hourly_price } = location.state.asset;

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
        backgroundColor: ['rgb(54,162,235,0.2)'],
        pointBackgroundColor: ['rgb(54,162,235,0.2)'],
        pointBorderColor: 'white'
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ]
    }
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

      <Container>
        <article
          className='canvas-container'
          style={{ minHeight: 300, width: 'auto' }}
        >
          <Line data={data} options={options} />
        </article>
      </Container>
    </>
  );
}

export default Chart;
