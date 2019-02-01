import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeACall, connectToSocketServer } from '../actions/example'

class Home extends Component {
  componentDidMount() {
    makeACall()
  }
  
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.props.example}</p>
      </div>
    )
  }
}

function mapStateToProps(appState) {
  return {
    example: appState.exampleReducer.example
  }
}

export default connect(mapStateToProps)(Home)