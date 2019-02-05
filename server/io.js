import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  const users = []

  io.on('connection', function(socket){

    // Join code/room
      socket.on('join room', code => {
        socket.join(code)
      })

    // Add/delete item

      socket.on('add item', user => {
        users.forEach((u,i) => {
          if(u.username === user) {
            users[i].isAdded = true
            users[i].step = "wait"
          }
        })
      })

      socket.on('remove item', user => {
        users.forEach((u, i) => {
          if(u.username === user) {
            users[i].isRemoved = true
            users[i].step = "wait"
          }
        })
      })

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
    
    // Add user
    socket.on('new user', user => {
      users.push({
        username: user,
        step: 'wait',
        isAdded: false,
        isRemoved: false
      })
    })
    

    console.log('User has connected to socket server')
  })
}