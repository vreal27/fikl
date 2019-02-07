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
      choiceList: {
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

socket.on('display items', items => {
  store.dispatch({
    type:'POST_CHOICE',
    choiceList: items
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
    socket.emit('add item', username, itemObj, code)
    resolve()
  })
  return promise
}

export function nextTurn(username) {
  console.log('action', username)
  socket.emit('next turn', username)
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

export function setCode(code) {
  store.dispatch({
    type: 'SET_CODE',
    payload: code
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