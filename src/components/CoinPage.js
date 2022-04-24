
import { LinearProgress, Typography  } from '@material-ui/core'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import CoinInfo from './CoinInfo'
import ReactHtmlParser from 'react-html-parser'
import { numberwithCommas } from './Banner/Carousel'
const CoinPage = () => {
  const {id} = useParams();
  const [coin, setcoin] = useState();
  const {currency,symbol}=CryptoState();

  const fetchCoin= async ()=>{
    const {data} = await axios.get(SingleCoin(id));
    setcoin(data);
  }
  useEffect(() => {
    fetchCoin();
  }, [])

  const useStyles={
    container:{
      display:'flex'
    },
    sidebar:{
      width:"30%",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      marginTop:25,
      borderRight:"2px solid grey"
    },
    heading:{
      fontWright:'bold',
      marginBottom:20,
      fontFamily:'Montserrat',
      marginLeft:20
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      paddingLeft:20,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 0,
      paddingTop: 10,
      width: "100%"
    }

  }
  //const classes=useStyles();
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>

  return (
    <div style={useStyles.container}>
    <div> 
      <img
      src={coin?.image.large}
      alt={coin?.name}
      height="200"
      style={{marginBottom:20, marginLeft:20}}
      ></img>
      <Typography variant="h3" style={useStyles.heading}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitle1" style={useStyles.description}>
      {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography>
      <br/>
      <div style={useStyles.marketData}>
      <span style={{display:'flex'}}>
      <Typography variant="h5" style={useStyles.heading}>Rank:</Typography>
      &nbsp; &nbsp;
      <Typography variant="h5" style={{fontFamily:'Montserrat'}}> {coin?.market_cap_rank}</Typography>
      </span>

      <span style={{display:'flex'}}>
      <Typography variant="h5" style={useStyles.heading}>Current Price::</Typography>
      &nbsp; &nbsp;
      <Typography variant="h5" style={{fontFamily:'Montserrat'}}> {symbol}{" "}
      {numberwithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
      </Typography>
      </span>

      <span style={{display:'flex'}}>
      <Typography variant="h5" style={useStyles.heading}>Market Cap:{" "}</Typography>
      &nbsp; &nbsp;
      <Typography variant="h5" style={{fontFamily:'Montserrat'}}> {symbol}{" "}
      {numberwithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
      </span>

      </div>
    </div>
    <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage 