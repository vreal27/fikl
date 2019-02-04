import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(){

    // Join code/room
      socket.on('join room', code => {
        socket.join(code)
      })

    // Add/delete item

    // Category

    // Chat room function

    // Change Turn




    

    console.log('User has connected to socket server')
  })
}