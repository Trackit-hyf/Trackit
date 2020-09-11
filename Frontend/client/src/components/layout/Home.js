import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import stockImg from '../../img/stock-market.jpg';

const Landing = () => {
	return (
		<section className="home">
			<div className="overlay">
				<div className="home-inner">
					<div>
						<h1 className="label">
							TRACK<span style={{ color: 'green' }}>i</span>T
						</h1>
						<div className="landing_text">
							<img className="icon" src={stockImg} alt="stockImage" />
							<h2>Track all of your assets and your cryptocurrencies in one place </h2>
						</div>
						<div className="landing_text">
							<img className="icon" src={stockImg} alt="stockImage" />
							<h2>Stay up-to-date with the market</h2>
						</div>
						<div className="landing_text">
							<img className="icon" src={stockImg} alt="stockImage" />
							<h2>All your assets in one place</h2>
						</div>
					</div>
					<Link to="/signup">
						<button className="landing_button">Keep me up-to-date</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Landing;
