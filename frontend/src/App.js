import React, { useState, useEffect } from 'react';
import './style/style.css'
import { GetData } from './queries/queries';

const App = () => {
  const fData = GetData('flights');
  const cData = GetData('cosmonauts');

  
  return (
    <div className="App">
      <div className="Container">
        hey
      </div>
    </div>
  );
}

export default App;
