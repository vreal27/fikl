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

export function editStatus(id){
  store.dispatch({
    type: 'EDIT_STATUS',
    id: id
  })
}

export function joinRoom(code) {
  socket.emit('join room', code)
}