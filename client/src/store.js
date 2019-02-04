import { createStore, combineReducers } from 'redux'

import listReducer from './reducers/listReducer'
// import all reducers here

const rootReducer = combineReducers({
  listReducer
  // put reducers here
})

const store = createStore(rootReducer)

export default store