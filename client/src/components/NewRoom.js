import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom, setCategory, setUsername, setCode } from '../actions/fikl'
import { Flipper, Flipped } from 'react-flip-toolkit'
import shuffle from 'lodash.shuffle'

const roomcode = Math.random().toString(36).toUpperCase().substr(2, 4)



class NewRoom extends Component {
    state = {
        username: '',
        category: '',
        preset: [`Food?`,`Movies?`,`Games?`,`Show?`]
    }

    

    componentDidMount() {
        setCode(roomcode)
        joinRoom(roomcode)
        setInterval(this.shuffle, 2000)
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
        this.props.history.push(`/${roomcode}`)
    }

    pickRandom = (e) => {
        e.preventDefault()
        let item = this.state.preset.length
        const pick = Math.floor(Math.random() * item)
        console.log(this.state.preset[pick])
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
                    <button type="submit">Everybody's In!</button>
                </form>

                <Flipper flipKey={this.state.preset.join("")}>
                <form onSubmit={this.pickRandom}>
                    <ul className="randomcat">
                        {this.state.preset.map(choice => (
                            <Flipped key={'choice' + choice} flipId={choice}> 
                                <li>{choice}</li>
                            </Flipped>
                           
                        ))}
                    </ul>
                    <h2>Can't decide on what to do?</h2>
                    <button type="submit">Pick for me!</button>
                </form>
                </Flipper>
                {/* <span><Link to={`/${roomcode}`}>Everybody's In!</Link></span> */}
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