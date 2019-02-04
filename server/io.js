import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){

    // Join code/room
      socket.on('join room', code => {
        socket.join(code)
      })

    // Add/delete item

    // Category
      socket.on('set category', category => {
        socket.emit('set category', category)
      })
    // Chat room function

    // Change Turn

    // Username
      socket.on('set username', username => {
        socket.emit('set username', username)
      })


    

    console.log('User has connected to socket server')
  })
}