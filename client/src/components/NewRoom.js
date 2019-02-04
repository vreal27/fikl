import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { joinRoom, setCategory, setUsername } from '../actions/fikl'

var roomcode = ''

class NewRoom extends Component {
    state = {
        username: '',
        category: ''
    }

    componentDidMount() {
        roomcode = Math.random().toString(36).toUpperCase().substr(2, 4)
        joinRoom(roomcode)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        setCategory(this.state.category)
        setUsername(this.state.username)
        this.setState({
            username: '',
            category: ''
        })
    }

    render() {
        
        return (
            <div>
                <h1>{roomcode}</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="username"
                        value={this.state.username}
                        placeholder="Who're you?"
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="category"
                        value={this.state.category}
                        placeholder="What're we picking?"
                    />
                </form>
                <span><Link to={`/${roomcode}`}>Everybody's In!</Link></span>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    return {
        category: appState.category
    }
}

export default connect(mapStateToProps)(NewRoom)