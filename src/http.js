const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
app.use(express.static(path.resolve(__dirname, '..', 'public')))
const httpServer = createServer(app)
const io = new Server(httpServer)

module.exports = {
  httpServer,
  io,
}
