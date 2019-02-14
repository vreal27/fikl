import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'
import shortId from 'shortid'

axios.defaults.baseURL = '/api'

// const socket = io.connect('http://192.168.0.113:3001')
const socket = io.connect('http://localhost:3001')

//depreciated?
export function postChoices(choice, code) {
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'POST_CHOICE',
      payload: {
        id: shortId.generate(),
        choice: choice,
        status: true,
        code: code

      }})
    resolve()
  })

  return promise
}

//adds the passed item to the items array in store
socket.on('display items', item => {
  store.dispatch({
    type: 'POST_CHOICE',
    payload: item
  })
})

//sends an item (choice the user suggests) to the items array in io
//is a promise to prevent async goof-ups
export function addItem(username, item, code) {
  var promise = new Promise((resolve, reject) => {
    let itemObj = {
      id: shortId.generate(),
      choice: item,
      status: true,
      code: code
    }
    socket.emit('add item', {user: username, item: itemObj, code: code})
    resolve()
  })
  return promise
}


export function addMessage(message) {
  const username = store.getState().listReducer.username

  socket.emit('new message', {
    user: username,
    message: message.message,
    roomcode: message.roomcode

  })

 
}
//updates the room object in the store, which is the current room the user is connected to

socket.on('update room', room => {
  store.dispatch({
    type: 'UPDATE_ROOM',
    payload: room
  })
})

//update whose turn it needs to be in io, identified both by name and code
export function nextTurn(username, code) {
  socket.emit('next turn', {username: username, code: code})
}

//update an item's status in the io and in the store
//is a promise to prevent async goof-ups
export function editStatus(user, id, code){
  var promise = new Promise((resolve, reject) => {
    socket.emit('remove item', {user: user, code: code, id: id})
    store.dispatch({
      type: 'EDIT_STATUS',
      id: id
    })

    resolve()
  })

  return promise
}

//adds a new room to the rooms object in the io
//is a promise to prevent async goof-ups
export function newRoom(category) {
  return new Promise((resolve, reject) => {
    socket.emit('new room', category)

    socket.on('new room', joinroom => {
      store.dispatch({
        type: 'NEW_ROOM',
        payload: joinroom
      })

      resolve(joinroom.code)
    })
  })
}

//sets the user's code value in the store
export function setCode(code) {
  store.dispatch({
    type: 'SET_CODE',
    payload: code
  })
}

//joins a room based on code
//is a promise to avoid async goof-ups
export function joinRoom(code) {
  return new Promise((resolve, reject) => {
    socket.emit('join room', code)

    resolve(code)
  })
}

//sets the room object in the store for the first time
socket.on('join room', room => {
  store.dispatch({
    type: 'NEW_ROOM',
    payload: room
  })
})

//sets the category both in io and store
//is a promise to avoid async goof-ups (tired of reading that yet?)
export function setCategory(category) {
  return new Promise((resolve, reject) => {
    socket.emit('set category', category)

    socket.on('set category', category => {
      store.dispatch({
        type: "SET_CATEGORY",
        payload: category
      })
    })

    resolve()
  })
  
}


//gets the category from the io, in case we need it
export function getCategory(roomcode) {
  socket.emit('get category', roomcode)
}

//passes along the category retrieved from the io to the store
socket.on('get category', category => {
  store.dispatch({
    type: "GET_CATEGORY",
    payload: category
  })
})

//sets a username in the store, and adds a new user to a specified room code in the io
//is a promise to avoid async goof-ups
export function setUsername(username, code) {
  return new Promise((resolve, reject) => {
    store.dispatch({
      type: 'SET_USERNAME',
      payload: username
    })
    
    socket.emit('new user', {username: username, code: code})

    resolve(code)
  })
}

//a user is done adding? tell the back-end
export function doneAdding(code) {
  return new Promise ((resolve, reject) => {
    socket.emit('done adding', code)

    resolve()
  })
}

//advances the user's step in the store
//"wait", "add", and "remove" are possible. Default is "add"
//changing steps changes which component loads on Steps.js
socket.on('next step', step => {
  store.dispatch({
    type: 'NEXT_STEP',
    payload: step
  })
})

//if io figures out that the list is complete, tell that to the store
//will set every user's step to "complete"
socket.on('complete', () => {
  store.dispatch({
    type: 'COMPLETE'
  })
})


//adds message to messages in io
socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    payload: message
  })
})

//passes the entire room object, as the users are now connected to the room
socket.on('pass users', (room) => {
  store.dispatch({
    type: 'PASS_USERS',
    payload: room
  })
})

//when a timer runs out on RemoveChoices.js, send to the back to advance turns
export function timeUp(username, code) {
  socket.emit('next turn', {username: username, code: code})
}