import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import store from '../store'

import AddChoices from './AddChoices'
import Start from './Start'
import NewRoom from './NewRoom'
import JoinRoom from './JoinRoom'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Start} />
              <Route path="/newroom" exact component={NewRoom} />
              <Route path="/joinroom" exact component={JoinRoom} />
<<<<<<< HEAD
              <Route path="/:roomcode/add" component={AddChoices} />
              
=======
              <Route path="/:roomcode" component={List} />
              o
>>>>>>> 1cf1e8b337a84254159e0bb2b2f672aa6da332e1
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
