import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom, setUsername } from '../actions/fikl'

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
        joinRoom(this.state.code)
        setUsername(this.state.username)
        this.props.history.push(`/${this.state.code}`)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input 
                        type="text"
                        name="code"
                        value={this.state.code}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Join!</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    
}

export default connect(mapStateToProps)(JoinRoom)