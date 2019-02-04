import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { joinRoom } from '../actions/fikl'

var roomcode = ''

class NewRoom extends Component {
    componentDidMount() {
        roomcode = Math.random().toString(36).toUpperCase().substr(2, 4)
        joinRoom(roomcode)
    }

    render() {
        
        return (
            <div>
                <h1>{roomcode}</h1>
                <span><Link to={`/${roomcode}`}>Everybody's In!</Link></span>
            </div>
        )
    }
}

function mapStateToProps(appState) {

}

export default connect(mapStateToProps)(NewRoom)