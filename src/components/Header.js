import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles={
  title:{
    flex:1,
    color:"gold",
    fontfamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer",
  }
}


const Header = () => {

  const navigate =useNavigate();

  const {currency,setCurrency} = CryptoState()
  const darktheme= createTheme({
    palette:{
      primary:{
        main:"#fff",
      },
      type:"dark",
    }
  })
  return (
    <ThemeProvider theme={darktheme}> 
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography onClick={()=>navigate("/")} variant='h6' style={useStyles.title}>
            Crypto Check
          </Typography>

          <Select variant="outlined" style={{width:100,height:40,marginRight:15}}
           value={currency}
           onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header