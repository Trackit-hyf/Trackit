import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

import './Home.css';
import stockImg from '../../img/stock-market.jpg';

const Landing = () => {
	const { user } = useContext(GlobalContext);
	
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
					<div className='landing_buttons_wrapper'> 
					<Link to="/signup">
						{!user.token && <button className="landing_button">Keep me up-to-date</button>}
					</Link>
					<Link to="/supportedCoins">
						{!user.token && <button className="landing_button">Supported Coins</button>}
					</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
