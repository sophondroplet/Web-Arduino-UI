const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

var msg 

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(join(__dirname, 'public'))
);
  
io.on('connection',(socket) =>{
  console.log('a user connected')
  
  // socket.on('message', (x) => {
  //   console.log('message: ' + x)
  // })

  socket.on('keydown', (x) => {
    msg = x
    writemsg(msg)
  })

    socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
  
// });

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
})



const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { ReadyParser } = require('@serialport/parser-ready')

const port = new SerialPort({ path:'COM5', baudRate: 9600, lock: false})
const readyparser = port.pipe(new ReadyParser({delimiter:'gay'}))
const parser = port.pipe(new ReadlineParser({delimiter:'\n'}))

port.on('open', () => {
    console.log("Port opened successfully")   
})

parser.on("data", (line) => {      
    console.log("nodejs received:", line)
})

readyparser.on('ready', ()=> {
    console.log('Ready byte sequence has been received')
    writeinitmsg("0 255 0")
})


function writeinitmsg(x) {
    port.write(x, (err) => {
        if(err) throw err;
        console.log("Inital write to port successful")})
}

function writemsg(x) {
    x = x.toString()
    console.log(x)
    port.write(x, (err) => {
        if(err) throw err;
        console.log("Write to port successful")})
}






