const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const quoteApi = require('./quoteApi')
const axios = require('axios')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/quoteApi', quoteApi)

let rooms = []
let users = []
let answer = []
io.on('connection', (socket) => {
  let userData = null;
  socket.on('userConnect', (data) => {
    console.log('someone-connected test', data);
    users.push(data)
    userData = data
    io.emit('USER_CONNECTED', users)
  })

  socket.on('create-room', data => {
    console.log("create-room", data);
    let room = {
      name: data["room-name"],
      users: [],
      admin: data.admin
    }
    rooms.push(room)
    io.emit("updated-room", rooms)
  })

  socket.on('sendAnswer', (data) => {
    console.log(data);
    console.log(users);
    users.map(el => {
      if (el.username === data.username) {
        return el.score = data.score
      }
    })
    io.emit('USER_CONNECTED', users)
    if (data.score >= 50) {
      socket.emit('win')
      socket.broadcast.emit('lose')
    }
  })

  socket.on('getQuote', () => {
    axios({
      url: 'https://favqs.com/api/qotd',
      method: 'get',
    })
      .then(({ data }) => {
        io.emit('QUOTE_RECEIVED', data.quote.body)
      })
      .catch(err => {
        io.emit('QUOTE_RECEIVED', "Internal server error mas, coba ketik aja gpp")
      })
  })

  socket.on('join-room', (data) => {
    console.log(data, "<< joinroom payload")
    console.log(rooms, "<< roooms");
    socket.join(data["room-name"], function () {
      let roomIndex = rooms.findIndex((i) => i.name == data["room-name"])
      console.log(roomIndex);
      rooms[roomIndex]['users'].push(data.username)
      console.log(rooms, "<< ini room");
      io.sockets.in(data["room-name"]).emit("room-detail", rooms[roomIndex])
    })
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