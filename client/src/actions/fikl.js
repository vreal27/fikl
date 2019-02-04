import axios from 'axios'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect()

export function joinRoom(code) {
  socket.emit('join room', code)
}