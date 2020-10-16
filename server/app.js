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
    // socket.emit('get-rooms', rooms)
  })

  // socket.on('create-room', data => {
  //   console.log("create-room", data);
  //   let room = {
  //     name: data["room-name"],
  //     users: [],
  //     admin: data.admin
  //   }
  //   rooms.push(room)
  //   // io.emit("updated-room", rooms)
  //   io.emit("UPDATED_ROOMS", rooms)
  // })

  socket.on('sendAnswer', (data) => {
    console.log(data, "<< data sendAnswer");
    console.log(users, "<< users sendanswer");
    // let roomIndex = rooms.findIndex((i) => i.name == data["room-name"])
    // console.log(rooms[roomIndex], "<<< room sendAnswewr");
    // let usernameIndex = rooms[roomIndex]["users"].findIndex((j) => j.username == data.username)
    // console.log(rooms[roomIndex]["users"].findIndex((j) => j.username == data.username), "<< updated room sendAnswer");
    // rooms[roomIndex]["users"][usernameIndex].score = data.score
    // console.log(rooms[roomIndex]["users"][usernameIndex], "<< updated user sendAnswer");
    // io.emit("UPDATED_ROOMS", rooms)
    // io.emit("ROOM_DETAIL", rooms[roomIndex])
    users.map(el => {
      if (el.username === data.username) {
        el.score += 10
        if (el.score >= 50) {
          socket.emit('win')
          socket.broadcast.emit('lose')
        }
      }
    })
    // if (data.score >= 50) {
    //   socket.emit('win')
    //   socket.broadcast.emit('lose')
    // }
    io.emit('USER_CONNECTED', users)
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
      rooms[roomIndex]['users'].push({
        username: data.username,
        score: 0
      })
      console.log(rooms, "<< ini room");
      // io.sockets.in(data["room-name"]).emit("room-detail", rooms[roomIndex])
      io.sockets.in(data["room-name"]).emit("ROOM_DETAIL", rooms[roomIndex])
    })
  })

  socket.on('disconnect', () => {
    console.log(userData, "disconnect");
    // console.log(users);
    // let indexDisconnectedUser = users.indexOf(userData)
    // let removed = users.splice(indexDisconnectedUser,1)
    // console.log(users)
    if (userData) {
      let indexDisconnectedUser = users.indexOf(userData)
      let removed = users.splice(indexDisconnectedUser,1)
      io.emit('USER_CONNECTED', users)
    }
  })

  socket.on('resetScore', (data) => {
    console.log("RESET<<<");
    users.map(user => {
      user.score = 0
    })
    io.emit('USER_CONNECTED', users)
    // socket.emit('get-rooms', rooms)
  })
})

http.listen(PORT, () => console.log('http://localhost:' + PORT))