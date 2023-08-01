import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SERVER = 'http://localhost:8000';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(SERVER);
    socket.on('serialdata', () => {
      setCount((prevCount) => prevCount + 1);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <div class="count">
      Jumps: {count}
    </div>
  );
}

export default App;
