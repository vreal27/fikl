import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect()

export function postChoices(choice) {
  store.dispatch({
    type: 'POST_CHOICE',
    choiceList: {
      choice: choice,
      status: true
    }
   
  })
}