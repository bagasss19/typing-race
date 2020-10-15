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
io.on('connection', (socket) => {
  console.log('a user connected');

})

http.listen(PORT, () => console.log('http://localhost:' + PORT))