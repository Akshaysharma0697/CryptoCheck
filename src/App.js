import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import CoinPage from './components/CoinPage';
import CoinsTable from './components/CoinsTable';
import Header from './components/Header';
import Homepage from './components/Homepage';

function App() {

  const AppStyle={
    App:{
      backgroundColor: '#14161a',
      color: 'white',
      minHeight:'100vh',

    }

  }
  


  return (
   <BrowserRouter>
     <div style={AppStyle.App}>
       <Header/>
       <Routes>
       <Route path='/' element={<Homepage />}/>
       <Route path='/coins' element={<CoinsTable />}/>       
       <Route path='/coins/:id' element={<CoinPage />}/>
       </Routes>
     </div>
   </BrowserRouter>
  );
}

export default App;
