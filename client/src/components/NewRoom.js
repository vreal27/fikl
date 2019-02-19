import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newRoom, setUsername } from '../actions/fikl'
import shuffle from 'lodash.shuffle'
import '../styles/NewRoom.css'

class NewRoom extends Component {
    state = {
        username: '',
        category: '',
        preset: [`Food`,`Movie`,`Game`,`Show`, `Ghouls?`]
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

    pickRandom = (e) => {
        e.preventDefault()
        let item = this.state.preset.length
        const pick = Math.floor(Math.random() * item)
        this.setState({
            category: this.state.preset[pick]
        })
        

    }

    pushChoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    shuffle = () => {
        this.setState({
            preset: shuffle(this.state.preset)
        })
    }

    render() {
        
        return (
            <div id="newRoomContainer">
                <div id="newInstructions">
                    So we're making a new room, huh? We'll just need a username for you (so we know what to call ya), and to know what kind of thing you're going to be choosing. To help spark some ideas, we have a list of them down below. If you can't decide, click the "Pick for me!" button and we'll throw one in for you. Free of charge!
                </div>
                <form onSubmit={this.handleSubmit} autoComplete="off" className="newRoomForm">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="username"
                        value={this.state.username}
                        placeholder="Who're you?"
                        className="newRoomInput"
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="category"
                        value={this.state.category}
                        placeholder="What're we picking?"
                        className="newRoomInput"
                    />
                    <button type="submit" className="newRoomButton">Let's get this started!</button>
                </form>

             
                <form onSubmit={this.pickRandom} className="newRoomForm">
                    <ul className="randomcat">
                        {this.state.preset.map(choice => (

                                <li>{choice}?</li>
                     
                           
                        ))}
                    </ul>
                    <h2>Can't decide on what to do?</h2>
                    <button type="submit" className="newRoomButton">Pick for me!</button>
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