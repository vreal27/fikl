import { createStore, combineReducers } from 'redux'

import exampleReducer from './reducers/exampleReducer'
// import all reducers here

const rootReducer = combineReducers({
  exampleReducer
  // put reducers here
})

const store = createStore(rootReducer)

export default store