import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editStatus, nextTurn, timeUp } from '../actions/fikl';
import '../styles/RemoveChoices.css'



class Remove extends Component {

    state = {
        elapsed: 0,
        start: Date.now()
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 50)
        this.timedout = setTimeout(this.timeIsUp, 15000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        clearTimeout(this.timedout)
        this.setState({
            start: Date.now()
        })
    }

    tick = () => {
        this.setState({
            elapsed: new Date() - this.state.start
        })
    }

    timeIsUp = () => {
        timeUp(this.props.username, this.props.room.code)
    }

    changeStatus = (id) => {
        const thisUser = this.props.username
        const thisRoom = this.props.room.code
        editStatus(thisUser, id, thisRoom).then(() => {
            nextTurn(thisUser, thisRoom)
        })
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100)
        var seconds = (elapsed / 10).toFixed(0)
        return (
            <div id="removeContainer">
                <h1 id="remove">Pick one {this.props.room.category} you don't like!</h1>
                <div className="removeInstructions">
                    Okay, so now let's pick one {this.props.room.category} that you're not super into. Try to be pretty quick about it, though, it's impolite to keep everyone else waiting!
                </div>
                 <ul id="removeChoices">
                     {this.props.room.items.map((c, i) =>(
                         <li key={`${c.id}${i}`} className= {c.status ? '' : 'complete'} onClick={() => this.changeStatus(c.id)}>
                         {c.choice}
                      </li>
                       
                    ))}
                </ul>
                <div id="timeBar">
                    <span id="timeremaining">{15 - seconds}</span>
                    <div id="wholetimeleft"></div>
                    <div id="wholetimeright"></div>
                    <div id="timelefteye"></div>
                    <div id="timerighteye"></div>
                    <div id="timersmile"></div>
                    <div id="talkbubble"></div>
                </div>
            </div>
        )

    }
}

function MapStateToProps(appState) {
    return {
        username: appState.listReducer.username,
        choices: appState.listReducer.choices,
        room: appState.listReducer.room
    }
}


export default connect(MapStateToProps)(Remove) 