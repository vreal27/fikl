import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(){
    console.log('User has connected to socket server')
  })
}