const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let users = []
io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('connect', {msg : 'user udah konek nih'})
})

http.listen(PORT, () => console.log('http://localhost:' + PORT))