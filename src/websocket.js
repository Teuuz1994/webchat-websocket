const { io } = require('./http')

const users = []
const messages = []

io.on('connection', (socket) => {
  socket.on('joinChat', (data, renderMessagesCallback) => {
    const userIsOnline = users.find(
      (user) => user.username === data.username && user.room === data.room
    )

    socket.join(data.room)
    messages.forEach((message) => {
      renderMessagesCallback(message)
    })

    if (userIsOnline) {
      userIsOnline.socket_id = socket.id
    } else {
      users.push({
        socket_id: socket.id,
        username: data.username,
        room: data.room,
      })
    }
  })

  socket.on('message', (data) => {
    messages.push(data)
    io.to(data.room).emit('message', data)
  })
})
