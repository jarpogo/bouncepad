import React from 'react';
import SerialData from './components/SerialData';
import Stopwatch from './components/StopWatch';

function App() {
  return (
    <div className="App">
      World Record: 88,047
      <SerialData />
      <Stopwatch />
    </div>
  );
}

export default App;
