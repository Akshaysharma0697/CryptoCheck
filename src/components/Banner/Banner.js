import React from 'react'
import { Container, Typography } from '@material-ui/core'
import Carousel from './Carousel'
const useStyles={
    banner:{
        backgroundImage:"url(./banner1.jpg)",
    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    },
    tagline:{
        display:'flex',
        heigh:'40%',
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'center'
    },
    typo:{
        fontWeight:'bold',
        marginBottom:15,
        fontFamily:'Montserrat'
    },
    sub:{
        color:'darkgrey',
        textTransform:'capitalize',
        fontFamily:'Montserrat'
    }
}
const Banner = () => {
  return (
    <div style={useStyles.banner} >

    <Container style={useStyles.bannerContent}>
        <div style={useStyles.tagline}>
        <Typography variant="h2" style={useStyles.typo}>
            Crypto Check
        </Typography>
        <Typography variant='subtitle2' style={useStyles.sub}>
            Get all the Info regarding your favourite Crypto currency
        </Typography>

        </div>

        <Carousel></Carousel>
    </Container>


    </div>
  )
}

export default Banner