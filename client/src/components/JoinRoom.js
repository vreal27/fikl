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
        this.setState({
            [e.target.name]: e.target.value
        })
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
                
                <form onSubmit={this.handleSubmit} autoComplete="off" className="joinform">
                <h1>Enter info to join!</h1>
                    <input 
                        className="enterinfo"
                        type="text"
                        name="code"
                        value={this.state.code}
                        onChange={this.handleChange}
                        placeholder="Room code"
                    />
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