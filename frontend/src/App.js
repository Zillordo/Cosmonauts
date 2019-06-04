import React from 'react';
import './style/style.css'
import { GetData } from './queries/queries';
// import backdrop from './components/backdrop/Backdrop';

// WriteCosmo a WriteFlights jsou pouze na test funkčnosti
const WriteCosmo = ({ data }) => {

  if (data == null) {
    return null;
  }
  return data.map(cosmo => {

    return (
      <div key={cosmo._id}>
        <p>{cosmo.name} {cosmo.surName}</p>
        <p>{cosmo.experience}</p>
      </div>
    )
  });
}

const WriteFlights = ({ data }) => {

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

const App = () => {
  const fData = GetData('flights');
  const cData = GetData('cosmonauts');


  return (
    <div className="App">
      <div className="Container">
        <WriteFlights data={fData.flights} />
        <WriteCosmo data={cData.cosmonauts} />
      </div>
    </div>
  );
}

export default App;
