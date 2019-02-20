import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom, setUsername } from '../actions/fikl'
import '../styles/JoinRoom.css'

class JoinRoom extends Component {
    state = {
        code: "",
        username: ""
    }

    handleChange = (e) => {
        if(e.target.name === "code") {
            this.setState({
                [e.target.name]: e.target.value.toUpperCase()
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        joinRoom(this.state.code).then(code => {
            setUsername(this.state.username, code).then(code => {
                this.props.history.push(`/${code}`)
            })
        })
    }

    render() {
        return (
            <div className="joincontainer">
                <h1 id="join">Let's join a room!</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off" className="joinform">
                    <div className="joinInstructions">
                        So you're joining an existing room, huh? No problem! Ask your friend (and/or enemy, we don't judge) for the room code they see on their screen after creating the room. Pop that into the room code area here:
                    </div>
                    <input 
                        className="enterinfo"
                        type="text"
                        name="code"
                        value={this.state.code}
                        onChange={this.handleChange}
                        placeholder="Room code"
                    />
                    <div className="joinInstructions">
                        And we'll need a username for you (so we know what to call ya):
                    </div>
                    <input 
                        className="enterinfo"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Username"
                    />
                    <button type="submit">Join!</button>
                </form>
            </div>
        )
    }
}

function mapStatetoProps(appState){
    return {
        category: appState.listReducer.category,
        room: appState.listReducer.room
    }
}


export default connect(mapStatetoProps)(JoinRoom)