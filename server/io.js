import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  const users = []

  const items = []

  io.on('connection', function(socket){

    // Join code/room
    socket.on('join room', code => {
      socket.join(code)
    })

    // Add/delete item

    socket.on('add item', (user, item, code) => {
      users.forEach((u, i) => {
        if(u.username === user && u.step === "add") {
          items.push(item)
          let roomItems = items.filter(i => i.code === code)
          users[i].isAdded = true
          users[i].step = "wait"
          socket.emit('display items', roomItems)
          socket.to(code).emit('display items', roomItems)
          socket.emit('next step', "wait")
          if(i < users.length - 1) {
            socket.to(users[i + 1]).emit('next step', "add")
          }
        }
      })
      let checkUsers = users.filter(user => !user.isAdded)
      console.log('check users[0]', users)
      if(checkUsers.length === 0) {
        users[0].step = "remove"
      }
    })

    socket.on('remove item', user => {
      users.forEach((u, i) => {
        if(u.username === user && u.step === "remove") {
          users[i].isRemoved = true
          users[i].step = "wait"
          socket.emit('next step', "wait")
          if(i < users.length - 1) {
            socket.to(users[i + 1].emit('next step', "remove"))
          }
        }
      })
      let checkUsers = users.filter(user => !user.isRemoved)
      if(checkUsers.length === 1) {
        socket.emit('complete')
      }
    })

    socket.on('display items', code => {

    })
      
    // Category
    socket.on('set category', category => {
      socket.emit('set category', category)
    })
    // Chat room function

    // Change Turn
    socket.on('next turn', username => {
      //goes through users array
      users.forEach((user, i) => {
        //if we're looking at the right user and the socket.id matches
        if(user.username === username && socket.id === user.id) {
          //if we're not on the last in the array
          if(i < users.length - 1) {
            //if it's already at "wait"
            if(user.step === "wait") {
              //if they have not yet added
              if(!user.isAdded) {
                //set their step to add
                users[i].step = "add"
                //emit to their socket to update the step on front-end
                socket.emit('next step', "add")
              //if they have added but not removed
              } else if (!user.isRemoved) {
                //set their step to remove
                users[i].step = "remove"
                //emit to their socket to update the step on front-end
                socket.emit('next step', "remove")
              }
            } else {
              //if they are not currently waiting
              //if they are on the "add" step
              if(user.step === "add") {
                //set the current turn to "wait"
                users[i].step = "wait"
                //if we're not yet at the end of the users array
                if(i < users.length - 1) {
                  //emit to the next socket in line to update the step on front-end
                  socket.to(users[i + 1].id).emit('next step', "add")
                //if we're the last user in the array
                } else {
                  //emit to the first user's socket to update to "remove"
                  socket.to(users[0].id).emit('next step', "remove")
                }
              //if they're on the "remove" step
              } else {
                //set the current user to "wait"
                users[i].step = "wait"
                //emit to the next user to go to "remove"
                socket.to(users[i + 1].id).emit('next step', "remove")
              }
              socket.emit('next step', "wait")
            }
          } else {
            if(user.step === "wait") {
              if(!user.isAdded) {
                console.log('should not finish')
                socket.emit('next step', "add")
              }
            } else {
              console.log('should finish')
              socket.emit('complete')
            }
          }
        }
      })
    })

    // Username
    socket.on('set username', username => {
      console.log('io', username)
      socket.emit('set username', username)
    })
    
    // Add user
    socket.on('new user', user => {
      if(users.length === 0) {
        users.push({
          username: user,
          id: socket.id,
          step: 'add',
          isAdded: false,
          isRemoved: false
        })
        socket.emit('next step', "add")
      } else {
        users.push({
          username: user,
          id: socket.id,
          step: 'wait',
          isAdded: false,
          isRemoved: false
        })
      }
      socket.emit('pass users', users)
    })

    // chat room
    socket.join('main')
    socket.on('new message', (message) => {
      io.to(message.roomcode).emit('new message', message)

    })

    

    

    console.log('User has connected to socket server')
  })
}