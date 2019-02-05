import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import store from '../store'

import AddChoices from './AddChoices'
import Start from './Start'
import NewRoom from './NewRoom'
import JoinRoom from './JoinRoom'
import RemoveChoices from './RemoveChoices'

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
              <Route path="/:roomcode/add" component={AddChoices} />
              <Route path="/:roomcode/remove" component={RemoveChoices}/>
              
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
