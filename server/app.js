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
let answer = []
io.on('connection', (socket) => {
<<<<<<< HEAD
  console.log('a user connected');
  io.emit('connect', {message : 'user udah konek nih'})
=======
  let userData = null;
  socket.on('userConnect', (data) => {
    console.log('someone-connected test', data);
    users.push(data)
    userData = data
    io.emit('userConnected', users)
  })

  socket.on('sendAnswer', (data) => {
    answer.push(data)
  })

  socket.on('disconnect', () => {
    console.log(userData, "disconnect");
    // console.log(users);
    // let indexDisconnectedUser = users.indexOf(userData)
    // let removed = users.splice(indexDisconnectedUser,1)
    // console.log(users)
  })
>>>>>>> ffe4f8495a9990c2684a3a3a62de40ea451c3978
})

http.listen(PORT, () => console.log('http://localhost:' + PORT))