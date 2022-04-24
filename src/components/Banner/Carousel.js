import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CryptoState} from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
const useStyles={
    Carousel:{
        height:"50%",
        display:'flex',
        alignItems:'center',
        //backgroundColor:
    },
    carouselitem:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white'
    }

}
export function numberwithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const Carousel = () => {
    const [trending,setTrending]=useState([])
    const {currency,symbol} = CryptoState();
    const fetchTrendingCoins= async ()=>{
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
    };

    useEffect(()=>{
        fetchTrendingCoins()
    },[currency]);
    
    const items= trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h>=0
        return(
            <Link style={useStyles.carouselitem} to={`/coins/${coin.id}`}>
            <img src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBotton:10}}
            />
            <span>
                {coin?.symbol}
                
                <br/>
                <span style={{color:profit>0?"rgb(14,203,-129)":"red",
                fontWeight:50
                }}>
                {profit &&"+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                <br/>
                <br/>
                <span style={{fontSize:22,fontWeight:500}}>
                    {symbol}{numberwithCommas(coin?.current_price.toFixed(2))}
                </span>
            </span>
            </Link>
        )
    })
    const responsive={
        0:{
            items:2
        },
        512:{
            items:4,
        }
    }
  return (
    <div style={useStyles.Carousel}>
    <AliceCarousel
    mouseTracking
    infinite
    autoPlayInterval={1000}
    animationDuration={1500}
    disableDotsControls
    responsive={responsive}
    autoPlay
    items={items}
    />
    </div>
    )
}

export default Carousel