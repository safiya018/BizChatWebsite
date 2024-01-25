const express =require('express')
const app = express();
const http = require('http').createServer(app)
const path=require('path')

const PORT = process.env.PORT||9000

http.listen(PORT,()=>{
    console.log(`Listing on port ${PORT}`);
})
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html')
})
//socket
const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("connected")

    socket.on('message', (msg) => {
      socket.broadcast.emit('message',msg)
    })
})