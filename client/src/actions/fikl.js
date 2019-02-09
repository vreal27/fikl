import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'
import shortId from 'shortid'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://10.68.0.181:3001')

export function postChoices(choice, code) {
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'POST_CHOICE',
      payload: {
        id: shortId.generate(),
        choice: choice,
        status: true,
        code: code
      }
    })
    resolve()
  })

  return promise
}

socket.on('display items', item => {
  store.dispatch({
    type: 'POST_CHOICE',
    payload: item
  })
})

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

socket.on('update room', room => {
  store.dispatch({
    type: 'UPDATE_ROOM',
    payload: room
  })
})

export function nextTurn(username, code) {
  console.log('action', username)
  socket.emit('next turn', username, code)
}

export function editStatus(id){
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'EDIT_STATUS',
      id: id
    })

    resolve()
  })

  return promise
}

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


export function setCode(code) {
  store.dispatch({
    type: 'SET_CODE',
    payload: code
  })
}

export function joinRoom(code) {
  return new Promise((resolve, reject) => {
    socket.emit('join room', code)

    resolve(code)
  })
}

socket.on('join room', room => {
  store.dispatch({
    type: 'NEW_ROOM',
    payload: room
  })
})

export function setCategory(category) {
  return new Promise((resolve, reject) => {
    socket.emit('set category', category)

    socket.on('set category', category => {
      console.log('category action', category)
      store.dispatch({
        type: "SET_CATEGORY",
        payload: category
      })
    })

    resolve()
  })
  
}



export function getCategory(roomcode) {
  socket.emit('get category', roomcode)
}

socket.on('get category', category => {
  store.dispatch({
    type: "GET_CATEGORY",
    payload: category
  })
})

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

export function doneAdding(code) {
  return new Promise ((resolve, reject) => {
    socket.emit('done adding', code)

    resolve()
  })
}

socket.on('next step', step => {
  store.dispatch({
    type: 'NEXT_STEP',
    payload: step
  })
})

socket.on('complete', () => {
  store.dispatch({
    type: 'COMPLETE'
  })
})


export function addMessage(message) {
  const username = store.getState().listReducer.username

  socket.emit('new message', {
    username: username,
    message: message.message
  })

 
}

socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  })
})

//passes the entire room object, as the users are now connected to the room
socket.on('pass users', (room) => {
  store.dispatch({
    type: 'PASS_USERS',
    payload: room
  })
})