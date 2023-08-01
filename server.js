const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const cors = require('cors');

const port = 8000;
const app = express();

// Use cors middleware to allow cors
app.use(cors());

const server = http.createServer(app);

// Pass cors option to Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

let serialPort;
let parser;

function openSerialPort() {
  serialPort = new SerialPort('/dev/tty.usbmodem11201', { baudRate: 9600 });
  console.log(`Listening on port ${port}`);
  parser = serialPort.pipe(new Readline());

  parser.on('data', (line) => {
    console.log(`> ${line}`);
    io.sockets.emit('serialdata', line);
  });

  serialPort.on('close', () => {
    console.log('Port closed.');
    attemptReconnection();
  });

  serialPort.on('error', (error) => {
    console.error('Serial port error:', error);
    attemptReconnection();
  });
}

function attemptReconnection() {
  const retryDelay = 3000; // 3 seconds

  console.log('Attempting to reconnect...');
  setTimeout(() => {
    openSerialPort();
  }, retryDelay);
}

server.listen(port, () => {
  openSerialPort();
});
