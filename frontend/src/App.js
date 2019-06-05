import React, { useState, useContext, createContext } from 'react';
import './style/style.css'
import { GetData } from './queries/queries';
import { CreateCosmonaut, CreateFlight } from './queries/mutation';
import Backdrop from './components/backdrop/Backdrop';
import FlightMOdal from './components/modal/FlightModal';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const FlightsData = createContext();
const CosmonautsData = createContext();
// WriteCosmo a WriteFlights jsou pouze na test funkčnosti
// const WriteCosmo = ({ data }) => {

//   if (data == null) {
//     return null;
//   }
//   return data.map(cosmo => {

//     return (
//       <div key={cosmo._id}>
//         <p>{cosmo.name} {cosmo.surName}</p>
//         <p>{cosmo.experience}</p>
//       </div>
//     )
//   });
// }

const WriteFlights = () => {
  const data = useContext(FlightsData);

  if (data == null) {
    return null;
  }
  return data.map(flight => {

    return (
      <div key={flight._id}>
        <p>{flight.capacity}</p>
        <p>{flight.date}</p>
      </div>
    )
  });
}

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  }
}));


const App = () => {
  const [flightToggle, setFlightToggle] = useState();
  const [date, setDate] = useState();
  const [capacity, setCapacity] = useState();

  const fData = GetData('flights');
  const cData = GetData('cosmonauts');

  const classes = useStyles();


  return (
    <FlightsData.Provider value={fData.flights}>
      <CosmonautsData.Provider value={cData.cosmonauts}>
        <div className="App">
          <div className="Container">
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon onClick={() => setFlightToggle(!flightToggle)} />
            </Fab>

            <WriteFlights />

            {flightToggle &&
              <React.Fragment>
                <Backdrop />
                <FlightMOdal
                  submit={() => (CreateFlight(date, capacity, WriteFlights), setFlightToggle(!flightToggle))}
                  date={date}
                  onDateChange={e => setDate(e.target.value)}
                  capacity={capacity}
                  onCapacityChange={e => setCapacity(e.target.value)}
                  onCancleClick={() => setFlightToggle(!flightToggle)}
                />
              </React.Fragment>}
          </div>
        </div>
      </CosmonautsData.Provider>
    </FlightsData.Provider>
  );
}

export default App;
