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
        users.forEach((u, i) => {
          if(u.username === user && u.step === "add") {
            users[i].isAdded = true
            users[i].step = "wait"
          }
        })
        let checkUsers = users.filter(user => !user.isAdded)
        if(checkUsers.length === 0) {
          users[0].step = "delete"
        }
      })

      socket.on('remove item', user => {
        users.forEach((u, i) => {
          if(u.username === user && u.step === "delete") {
            users[i].isRemoved = true
            users[i].step = "wait"
          }
        })
        let checkUsers = users.filter(user => !user.isRemoved)
        if(checkUsers.length === 1) {
          socket.emit('complete')
        }
      })
      
    // Category
      socket.on('set category', category => {
        socket.emit('set category', category)
      })
    // Chat room function

    // Change Turn
      socket.on('next turn', username => {
        users.forEach((user, i) => {
          if(user.username === username) {
            if(i < users.length - 1) {
              if(user.step === "wait") {
                if(!user.isAdded) {
                  socket.emit('next step', "add")
                } else if (!user.isRemoved) {
                  socket.emit('next step', "remove")
                }
              } else {
                socket.emit('next step', "wait")
              }
            } else {
              if(user.step === "wait") {
                if(!user.isAdded) {
                  socket.emit('next step', "add")
                }
              } else if(user.step === "add") {
                socket.emit('complete')
              }
            }
          }
        })
      })

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