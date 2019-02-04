import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import store from '../store'

<<<<<<< HEAD
import AllChoices from './AllChoices'
=======
import Start from './Start'
import NewRoom from './NewRoom'
import JoinRoom from './JoinRoom'
>>>>>>> master

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
<<<<<<< HEAD
            <Route path="/" exact component={AllChoices} />
=======
            <Switch>
              <Route path="/" exact component={Start} />
              <Route path="/newroom" exact component={NewRoom} />
              <Route path="/joinroom" exact component={JoinRoom} />
              <Route path="/:roomcode" component={Start} />
            </Switch>
>>>>>>> master
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
