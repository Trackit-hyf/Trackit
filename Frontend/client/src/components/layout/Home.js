import React, { useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import './Home.css';

function Home() {
	const { user } = useContext(GlobalContext);

	return (
		<div className="home-container">
			<video src="/videos/back-video3.mp4" autoPlay loop muted />
			<h1>
				TRACK<span style={{ color: 'green' }}>i</span>T
			</h1>

			<p>Reach more than 50 most valuable coins</p>
			<p>Stay up-to-date with the market</p>
			<p>All your assets in one place</p>
			<div className="home-btns">
				<Link to="/signup">
					{!user.token && (
						<Button className="home-btns" buttonStyle="btn--outline" buttonSize="btn--large">
							Keep me up-to-date
						</Button>
					)}
				</Link>

				<Link to="/supportedcoins" className="btn-mobile">
					{!user.token && <button className={`btn btn--primary btn--large`}>Supported Coins</button>}
				</Link>
			</div>
		</div>
	);
}

export default Home;
