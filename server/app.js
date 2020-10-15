const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let users = []
let answer = []
io.on('connection', (socket) => {
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
})

http.listen(PORT, () => console.log('http://localhost:' + PORT))