import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect()

export function makeACall() {
  axios.get('/example').then(resp => {
    store.dispatch({
      type: 'EXAMPLE', 
      example: resp.data.example
    })
  })
}