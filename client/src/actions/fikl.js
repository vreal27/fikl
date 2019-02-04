import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'
import shortId from 'shortid'

axios.defaults.baseURL = '/api'

const socket = io.connect()

export function postChoices(choice) {
  store.dispatch({
    type: 'POST_CHOICE',
    choiceList: {
      id: shortId.generate(),
      choice: choice,
      status: true
    }
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
  socket.emit('set username', username)
}

socket.on('set category', username => {
  store.dispatch({
    type: "SET_USERNAME",
    payload: username
  })
})