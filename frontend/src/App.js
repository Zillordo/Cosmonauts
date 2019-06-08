import React, { useState, useEffect } from 'react';
import './style/style.css';

import { getFlights } from './queries/queries';
import { CreateFlight } from './queries/mutation';

import Backdrop from './components/backdrop/Backdrop';
import FlightModal from './components/modal/FlightModal';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import WriteFlights from './components/Write/WriteFlights';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  }
}));



const App = () => {
  const [flightToggle, setFlightToggle] = useState();

  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  
  const [flight, setFlight] = useState([]);

  const classes = useStyles();

  const resetF = () => {
    setDate('');
    setCapacity('');
  };

  const getF = async () => {
    const dataf = await getFlights();

    setFlight(dataf);
  };

  const makeFlight = () => {
    if (date, capacity === '') {
      window.alert("Nejsou vyplněna všechna povinná okna");
      return null;
    };

    CreateFlight(date, capacity, getF);
    setFlightToggle(!flightToggle);
    resetF();
  };



  useEffect(() => {
    getF();
  }, []);


  return (
    <div className="App">
      <div className="Container">
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={() => setFlightToggle(!flightToggle)} />
        </Fab>

        <WriteFlights
          getData={() => getF()}
          resetF={resetF}
          data={flight}
        />

        {flightToggle &&
          <React.Fragment>
            <Backdrop />
            <FlightModal
              submit={e => { e.preventDefault(); makeFlight() }}
              date={date}
              onDateChange={e => setDate(e.target.value)}
              capacity={capacity}
              onCapacityChange={e => setCapacity(e.target.value)}
              onCancleClick={() => { setFlightToggle(!flightToggle); resetF() }}
            />
          </React.Fragment>}
      </div>
    </div>
  );
}

export default App;
