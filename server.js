// // const net = require('net');
// // const fs = require('fs');

// // const port = 4;

// // const server = net.createServer((socket) => {
// //   console.log('A client connected:', socket.remoteAddress + ':' + socket.remotePort);

// //   // Handle data received from the client
// //   socket.on('data', (data) => {
// //     const receivedData = data.toString();
// //     console.log('Received data:', receivedData);

// //     // Append data to a text file
// //     fs.appendFile('data.txt', receivedData + '\n', (err) => {
// //       if (err) throw err;
// //       console.log('Data appended to data.txt');
// //     });
// //   });

// //   // Handle client disconnection
// //   socket.on('end', () => {
// //     console.log('Client disconnected:', socket.remoteAddress + ':' + socket.remotePort);
// //   });
// // });

// // // Start listening on the specified port
// // server.listen(port, () => {
// //   console.log(`Server is listening on port ${port}`);
// // });

// // import { SerialPort } from 'serialport';
// const  SerialPort  = require('serialport');
// SerialPort=SerialPort.SerialPort;

// const Readline = require('@serialport/parser-readline');
// const fs = require('fs');

// const port = new SerialPort({path: '/dev/COM4', baudRate: 9600}
//    // Adjust baud rate according to the device
// );

// // const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// // // Specify the file path for appending data
// // const filePath = 'receivedData.txt';

// // // Create a write stream to append data to the file
// // const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

// // // Event handler for receiving data
// // parser.on('data', (data) => {
// //   const receivedData = data.toString();
// //   console.log(receivedData); // Output received data

// //   // Append the received data to the text file
// //   writeStream.write(receivedData + '\n');
// // });

// // // Event handler for the 'close' event
// // port.on('close', () => {
// //   // Close the write stream when the serial port is closed
// //   writeStream.end();
// //   console.log('Serial port closed');
// // });

// // // Event handler for the 'error' event
// // port.on('error', (err) => {
// //   console.error('Error:', err.message);
// // });

// // // Close the serial port gracefully on process exit
// // process.on('exit', () => {
// //   port.close();
// // });

// // // Gracefully handle process interruption signals
// // ['SIGINT', 'SIGTERM'].forEach((signal) => {
// //   process.on(signal, () => {
// //     process.exit();
// //   });
// // });
const { SerialPort } = require('serialport'); 
const { DelimiterParser } = require('@serialport/parser-delimiter');
const { ReadlineParser } = require('@serialport/parser-readline');
const { ReadyParser } = require('@serialport/parser-ready');
const fs = require('fs');


SerialPort.list()
.then((ports) => {
    //console.log('Available serial ports:');
    ports.forEach((port) => {
        // console.log(port); 
        //console.log(port.path);
        var port = new SerialPort({ path: port.path, baudRate: 9600 })
        var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
        

        // Specify the file path for appending data
        var filePath = 'receivedData.txt';

        // Create a write stream to append data to the file
        var writeStream = fs.createWriteStream(filePath, { flags: 'a' });

        // Event handler for receiving data
        parser.on('data', (data) => {
          var receivedData = data.toString();
          // console.log(receivedData); // Output received data

          // Append the received data to the text file
          writeStream.write(receivedData + '\n');
        });

        // Event handler for the 'close' event
        port.on('close', () => {
          // Close the write stream when the serial port is closed
          writeStream.end();
          // console.log('Serial port closed');
        });

        // Event handler for the 'error' event
        port.on('error', (err) => {
          console.error('Error:', err.message);
        });

        // Close the serial port gracefully on process exit
        process.on('exit', () => {
          port.close();
        });

        // Gracefully handle process interruption signals
        ['SIGINT', 'SIGTERM'].forEach((signal) => {
          process.on(signal, () => {
            process.exit();
          });
        });
 
    });
})
.catch((err) => {
    console.error('Error listing serial ports:', err);
})




