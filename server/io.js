import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  const rooms = []

  io.on('connection', function(socket){

    const users = []


    //create new room
    socket.on('new room', category => {
      //create roomcode
      const roomcode = Math.random().toString(36).toUpperCase().substr(2, 4)

      //push code and category to rooms array via room object
      rooms.push({
        code: roomcode,
        category: category,
        items: [],
        users: []
      })

      //find the room we just created
      //needed if the number of rooms is greater than 1
      const joinroom = rooms.find(room => room.code === roomcode)
      //join the correct room
      socket.join(joinroom.code)
      //emit room data to the correct room
      io.to(joinroom.code).emit('new room', joinroom)
    })

    // Join code/room
    socket.on('join room', code => {
      //if the room they're trying to join exists with the code they specify
      const joinroom = rooms.find(room => room.code === code)
      if(joinroom) {
        //join that room
        socket.join(code)
      }
      socket.emit('join room', joinroom)
      // io.to(joinroom.code).emit('join room', joinroom)
    })

    // Add/delete item

    socket.on('add item', ({user, item, code}) => {
      const currRoom = rooms.find(room => room.code === code)
      //parse through users array to find the one adding an item
      currRoom.users.forEach((u, i) => {
        //if the username matches and they're on the "add" step
        if(u.username === user && u.doneAdding === false) {
          //push the item they added to the items array
          rooms.find(room => room.code === code).items.push(item)
          //emit to the particular socket that sent the item
          io.to(code).emit('update room', currRoom)
       
        }
      })
     
    })

    socket.on('done adding', (code) => {
      const currRoom = rooms.find(room => room.code === code)
      currRoom.users.forEach((user, i) => {
        if(user.id === socket.id) {
          rooms.find(room => room.code === code).users[i].doneAdding = true
        }
        //if the number of users in the room that are not done adding is greater than 1
        if(rooms.find(room => room.code === code)
          .users.filter(u => u.doneAdding === false).length >= 1) {
            //tell this socket to wait
            socket.emit('next step', "wait")
        } else if (rooms.find(room => room.code === code)
          .users.filter(u => u.doneAdding === false) < 1) {
            //if there are no more users that aren't done adding
            socket.emit('next step', "wait")
            //emit to the first user to go to remove
            const firstUser = rooms.find(room => room.code === code).users[0].id
            // changes first user's status to true
            rooms.find(room => room.code === code).users[0].myTurn = true
            io.to(firstUser).emit('next step', "remove")
          }
      })
    })

    socket.on('remove item', (user, code) => {
      const currRoom = rooms.find(room => room.code === code)
      currRoom.users.forEach((u, i) => {
        if(u.username === user && u.step === "remove") {
          users[i].isRemoved = true
          users[i].step = "wait"
          socket.emit('next step', "wait")
          if(i < users.length - 1) {
            socket.to(users[i + 1].id).emit('next step', "remove")
          }
        }
      })
      let checkUsers = users.filter(user => !user.isRemoved)
      if(checkUsers.length === 1) {
        socket.emit('complete')
      }
    })

    
      
    // Category
    socket.on('set category', (category, code) => {
      const lookroom = rooms.find(room => room.code === code)
      io.to(lookroom.code).emit('set category', category)
    })

    socket.on('get category', code => {
      const lookroom = rooms.find(room => room.code === code)
      if (lookroom.code === code) {
        io.to(lookroom.code).emit('get category', lookroom.category)
      }
    }) 
    // Chat room function

    // Change Turn
    socket.on('next turn', (username, code) => {
      let nextPerson = 0
      let currPerson = 0
      const currRoom = rooms.find(room => room.code === code)
      //goes through users array
      currRoom.users.forEach((user, i) => {
        //if we're looking at the right user and the socket.id matches
        if(user.username === username && socket.id === user.id) {
          //if we're not on the last in the array
          if(i < users.length - 1) {
            //if it's the user's turn
            if(user.myTurn === true) {
              //emit to their socket to update the step on front-end
              socket.emit('next step', "remove")
              //it will no longer be their turn on the next loop
              //next loop happens when an item is removed
              users[i].myTurn = false
              //define who the next user will be
              //can't update it in the forEach loop, as it'd just set everyone
              //to .myTurn = true
              nextPerson = i + 1
              currPerson = i
            } else {
              //we're on the last in the array
              if(user.myTurn === true) {
                //if it's the user's turn
                //emit to their socket to update the step on front-end
                socket.emit('next step', "remove")
                users[i].myTurn = false
                //define who the next user will be
                nextPerson = 0
                currPerson = i
              }
            }
          }
        }
      })
      //set the next person to take their turn
      users[nextPerson].myTurn = true
      io.to(users[currPerson].id).emit('next step', "wait")
      const thisRoom = rooms.find(room => room.code === code)
      const filterItems = thisRoom.items.filter(item => item.status === true)
      //if we have exactly one not-crossed-out item remaining
      if(filterItems.length === 1) {
        //send to everyone in this person's roomcode that we're done here boys
        io.to(users[currPerson].code).emit('complete')
      }
    })

    // Username
    socket.on('set username', ({username, code}) => {
      console.log('newroom', rooms)
      console.log('code', code)
      socket.emit('set username', {username: username, code: code})
    })
    
    // Add user
    socket.on('new user', ({username, code}) => {
      console.log('new user', username)
      rooms.find(room => room.code === code).users.push({
        username: username,
        id: socket.id,
        myTurn: false,
        doneAdding: false,
        code: code
      })
      console.log('testo', rooms, username)
      let thisRoom = rooms.find(room => room.code === code)
      socket.emit('next step', "add")
      socket.emit('pass users', thisRoom)
    })

    // chat room
    socket.join('main')
    socket.on('new message', (message) => {
      io.to(message.roomcode).emit('new message', message)

    })

    

    

    console.log('User has connected to socket server')
  })
}