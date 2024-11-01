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
    console.log(msg)
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


