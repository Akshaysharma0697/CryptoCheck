import { Container, createTheme, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'

import { numberwithCommas } from './Banner/Carousel'

const CoinsTable = () => {

    const [coins,setCoins]=useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch]=useState("");
    const [page, setpage] = useState(1);
    const {currency,symbol} = CryptoState();

    const navigate= useNavigate()

    const fetchCoins= async ()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(()=>{
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);
    const darktheme= createTheme({
        palette:{
          primary:{
            main:"#fff",
          },
          type:"dark",
        }
      })

    const handleSearch= () => {
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search) 
        )
    } 
    const useStyles={
        row:{
            //backgroundColor:"#16171a",
            cursor:"pointer",
            // "&:hover":{
            //     backgroundColor:'#131111',
            // },
            fontFamily:'Montserrat'
        },
        pagination:{
            "& .MuiPaginationItemRoot":{
                color:"gold",
            },
        },
        
    }
    
  return (
    <ThemeProvider theme={darktheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant="h4"
            style={{margin:18,fontFamily:"Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField label="Search For a Crypto Currency.." variant="outlined" 
            style={{marginBottom:20,width:"100%"}}
            onChange={(e)=>setSearch(e.target.value)}
            >
            </TextField>

            <TableContainer component={Paper}>
                {
                    loading?(
                        <LinearProgress style={{background:"gold"}}></LinearProgress>
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{backgroundColor:"#EEBC1D"}}>
                                <TableRow>
                                   {["Coin","Price","24h change","Market Cap"].map((head)=>
                                   (
                                       <TableCell
                                       style={{color:'black',fontWeight:'700',fontFamily:'Montserrat'}}
                                       key={head}
                                       align={head==="Coin"?"":"center"}
                                       >
                                        {head}
                                       </TableCell>
                        
                                   ))} 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                    const profit=row.price_change_percentage_24h >0;
                                    return (
                                        <TableRow
                                        onClick={()=>navigate(`/coins/${row.id}`)}
                                        style={useStyles.row}
                                        key={row.name} >
                                        
                                            <TableCell component="th" scope="row" styles={{display:"flex", gap:15}}>
                                            <img 
                                             src={row?.image}
                                             alt={row.name}
                                             height="50"
                                             style={{marginBottom:10}}   
                                            />
                                            
                                            <div style={{display:"flex",flexDirection:"row"}}>
                                            <span 
                                            style={{textTransform:"uppercase",fontSize:22}}>
                                                {row.symbol}
                                            </span>
                                            &nbsp; 
                                            <span  style={{color:"darkgrey"}}>{row.name}</span>
                                            </div>

                                            
                                            </TableCell>
                                            
                                            <TableCell
                                            align="center">
                                            {symbol}{" "}
                                            {numberwithCommas(row.current_price.toFixed(2))}
                                            </TableCell>

                                            <TableCell align='center' style={{color:profit > 0 ? "rgb(14,203,129)":"red",
                                                fontWeight:500
                                                }}>
                                                {profit &&"+"}{row?.price_change_percentage_24h?.toFixed(2)}%
                                                
                                            </TableCell>
                                            <TableCell align="center">
                                                {symbol}{" "}
                                                {numberwithCommas(row.market_cap.toString().slice(0,-6))}M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination style={{padding:20,
            width:"100%",
            display:"flex",
            justifyContent:"center"}}
            
            count={parseInt((handleSearch()?.length/10).toFixed(0))}   
            onChange={(_,value)=>{
                setpage(value);
                window.scroll(0,450);
            }}>
            </Pagination>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
