import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import CoinsTable from './CoinsTable'
import { Dimmer, Loader} from 'semantic-ui-react';


export default function SupportedCoins(props) {
    const [error, setError] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState(); 

    useEffect(()=>{
        const fetchData= async()=>{
          try{
            const response = await Axios.get('https://api.coingecko.com/api/v3/coins/'); 
            setCoins(response.data)
            setLoading(false)
          }catch (error){
            setError(true)
          }
        }
        fetchData(); 
      },[]); 
    return (
      <div> 
        {error && <h1>Couldn't load coins</h1> }
        {loading && 	<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>}
        {coins && <CoinsTable coins={coins}/> }
      </div>
    )
}
