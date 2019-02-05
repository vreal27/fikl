import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'
import shortId from 'shortid'

axios.defaults.baseURL = '/api'

const socket = io.connect()

export function postChoices(choice, username) {
  store.dispatch({
    type: 'POST_CHOICE',
    choiceList: {
      id: shortId.generate(),
      choice: choice,
      status: true
    }
  }).then(resp => {
    socket.emit('next turn', username)
  })
}

export function editStatus(id, username){
  store.dispatch({
    type: 'EDIT_STATUS',
    id: id
  }).then(resp => {
    socket.emit('next turn', username)
  })
}

export function joinRoom(code) {
  socket.emit('join room', code)
}

export function setCategory(category) {
  socket.emit('set category', category)
}

socket.on('set category', category => {
  store.dispatch({
    type: "SET_CATEGORY",
    payload: category
  })
})

export function setUsername(username) {
  store.dispatch({
    type: 'SET_USERNAME',
    payload: username
  })
  socket.emit('set username', username)
}

socket.on('set username', username => {
  socket.emit('new user', username)
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

  socket.on('new message', (message) => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: message
    })
  })
}