import React, { useState, useContext, createContext, useEffect } from 'react';
import './style/style.css'
import { getFlights } from './queries/queries';
import { RegisterCosmonaut, CreateFlight, DeleteFlight, DeleteCosmonaut, UpdateFlight } from './queries/mutation';
import Backdrop from './components/backdrop/Backdrop';
import FlightModal from './components/modal/FlightModal';
import UpdateFlightModal from './components/modal/UpdateFlightModal';
import CosmoModal from './components/modal/CosmoModal';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';


const FlightsData = createContext();


const WriteCosmo = ({ data, getData }) => {
  if (data == null) {
    console.log("chyba výpisu kosmonautů");
    return null;
  }

  return data.map(cosmo => {
    return (
      <div key={cosmo._id}>
        {cosmo.name} {cosmo.surName}
        <div className="delete-container">
          <DeleteIcon onClick={() => DeleteCosmonaut(cosmo._id, getData)} />
        </div>
      </div>
    )
  });
}


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  }
}));

const WriteFlights = (props) => {
  const classes = useStyles();
  const data = useContext(FlightsData);
  const [flightToggle, setFlightToggle] = useState();
  const [cosmoToggle, setCosmotoggle] = useState();
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [age, setAge] = useState('');
  const [exp, setExp] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');

  const resetC = () => {
    setName('');
    setSurName('');
    setAge('');
    setExp('');
  }

  if (data == null) {
    return null;
  }
  return data.map(flight => {

    const reg = () => {
      if (flight.registeredCosmonauts.length >= flight.capacity) {
        window.alert("Let je již plný");

        return null;
      }
      if (name, surName, age, exp == '') {
        window.alert("Nejsou vyplněna všechna povinná okna");
        return null;
      }

      RegisterCosmonaut(name, surName, age, exp, flight._id, props.getData);
      setCosmotoggle(!cosmoToggle);
      resetC();
    }

    return (
      <div key={flight._id} className="flight-container">
        <div className="text-container">
          <div>{flight.date}</div>
          <div>{flight.capacity}</div>
          <WriteCosmo data={flight.registeredCosmonauts} getData={props.getData} />
        </div>
        <div className="delete-container">
          <Fab color="primary" aria-label="Add" size="small" className={classes.fab}>
            <AddIcon onClick={() => setCosmotoggle(!cosmoToggle)} />
          </Fab>
          <Fab aria-label="Delete" size="small" className={classes.fab}>
            <DeleteIcon onClick={() => DeleteFlight(flight._id, props.getData)} />
          </Fab>
          <Fab color="secondary" size="small" aria-label="Edit" className={classes.fab}>
            <Icon onClick={() => { setFlightToggle(!flightToggle); setDate(flight.date); setCapacity(flight.capacity) }}></Icon>
          </Fab>
        </div>
        {cosmoToggle &&
          <React.Fragment>
            <Backdrop />
            <CosmoModal
              name={name}
              onNameChange={e => setName(e.target.value)}
              surName={surName}
              onSurNameChange={e => setSurName(e.target.value)}
              age={age}
              onAgeChange={e => setAge(e.target.value)}
              exp={exp}
              onExpChange={e => setExp(e.target.value)}
              submit={e => { e.preventDefault(); reg() }}
              onCancleClick={() => { setCosmotoggle(!cosmoToggle); resetC() }}
            />
          </React.Fragment>
        }
        {flightToggle &&
          <React.Fragment>
            <Backdrop />
            <UpdateFlightModal
              submit={e => { e.preventDefault(); UpdateFlight(date, capacity, flight._id, props.getData); setFlightToggle(!flightToggle); props.resetF() }}
              date={date}
              onDateChange={e => setDate(e.target.value)}
              capacity={capacity}
              onCapacityChange={e => setCapacity(e.target.value)}
              onCancleClick={() => { setFlightToggle(!flightToggle); props.resetF() }}
            />
          </React.Fragment>}
      </div>
    )
  });
}




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
    if (date, capacity == '') {
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
    <FlightsData.Provider value={flight}>
      <div className="App">
        <div className="Container">
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon onClick={() => setFlightToggle(!flightToggle)} />
          </Fab>

          <WriteFlights
            getData={() => getF()}
            resetF={resetF}
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
    </FlightsData.Provider>
  );
}

export default App;
