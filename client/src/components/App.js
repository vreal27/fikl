import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import store from '../store'

import AllChoices from './AllChoices'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={AllChoices} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
