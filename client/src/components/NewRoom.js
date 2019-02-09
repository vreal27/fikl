import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newRoom, setUsername } from '../actions/fikl'

class NewRoom extends Component {
    state = {
        username: '',
        category: ''
    }

    componentDidMount() {
        // setCode(roomcode)
        // joinRoom(roomcode)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let uName = this.state.username
        newRoom(this.state.category).then(code => {
            setUsername(uName, code).then(code => {
                this.props.history.push(`/${code}`)
            })
        })
        this.setState({
            username: '',
            category: ''
        })
    }

    render() {
        
        return (
            <div>
                {/* <h1>{roomcode}</h1> */}
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
                    <button type="submit">Everybody's In!</button>
                </form>
                {/* <span><Link to={`/${roomcode}`}>Everybody's In!</Link></span> */}
            </div>
        )
    }
}

function mapStateToProps(appState) {
    return {
        room: appState.listReducer.room
    }
}

export default connect(mapStateToProps)(NewRoom)