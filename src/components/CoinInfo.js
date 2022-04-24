import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from '../CryptoContext';
import SelectButton from './SelectButton';
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';
Chart.register (LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);


const CoinInfo = ({coin}) => {
    const [historical, sethistorical] = useState()
    const [days,setDays] = useState(1);
    const {currency} = CryptoState();
    const [flag,setflag] = useState(false);
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setflag(true);
      sethistorical(data.prices);
    };

    useEffect(()=>{
        fetchHistoricData();
    },[days]);

    const darktheme=createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:"dark"
        }
    })
    const useStyles = {
        container: {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
        },
      };
    


    return (
    <ThemeProvider theme={darktheme}>
    <div style={useStyles.container}>
    {!historical | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historical.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historical.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}

    </div>
    </ThemeProvider>
  )
}

export default CoinInfo