import React, { useState, useContext, createContext, useEffect } from 'react';
import './style/style.css'
import { GetData, getFlights } from './queries/queries';
import { CreateCosmonaut, CreateFlight, DeleteFlight, DeleteCosmonaut } from './queries/mutation';
import Backdrop from './components/backdrop/Backdrop';
import FlightMOdal from './components/modal/FlightModal';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'
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
const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  }
}));

const WriteFlights = (props) => {
  const data = useContext(FlightsData);
  const classes = useStyles();

  if (data == null) {
    return null;
  }
  return data.map(flight => {

    return (
      <div key={flight._id} className="flight-container">
        <div className="text-container">
          <div>{flight.date}</div>
          <div>{flight.capacity}</div>
        </div>
        <div className="delete-container">
          <Fab aria-label="Delete" className={classes.fab}>
            <DeleteIcon onClick={() => {DeleteFlight(flight._id); props.getData()}} />
          </Fab>
        </div>
      </div>
    )
  });
}




const App = () => {
  const [flightToggle, setFlightToggle] = useState();
  const [date, setDate] = useState("2019-05-19T10:30");
  const [capacity, setCapacity] = useState('');
  const [flight, setFlight] = useState([]);

  const fData = GetData('flights');
  const cData = GetData('cosmonauts');

  const classes = useStyles();

  const get = async () => {
    const data = await getFlights();
    setFlight(data);
  }

  useEffect(() => {
    get();
  }, []);


  console.log(flight);

  return (
    <FlightsData.Provider value={flight}>
      <CosmonautsData.Provider value={cData.cosmonauts}>
        <div className="App">
          <div className="Container">
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon onClick={() => setFlightToggle(!flightToggle)} />
            </Fab>

            <WriteFlights
              getData={() => get()}
            />

            {flightToggle &&
              <React.Fragment>
                <Backdrop />
                <FlightMOdal
                  submit={() => { CreateFlight(date, capacity, WriteFlights); setFlightToggle(!flightToggle) }}
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
