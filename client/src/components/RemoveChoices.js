import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editStatus, nextTurn } from '../actions/fikl';
import '../styles/RemoveChoices.css'



class Remove extends Component {

    changeStatus = (id) => {
        const thisUser = this.props.username
        const thisRoom = this.props.room.code
        editStatus(thisUser, id, thisRoom).then(() => {
            nextTurn(thisUser, thisRoom)
        })
    }

    render() {
        return (
            <div id="removeContainer">
                <h1>{this.props.room.code}</h1>
                <h2>Pick one {this.props.room.category} you don't like</h2>
                 <ul>
                     {this.props.room.items.map((c, i) =>(
                         <li key={`${c.id}${i}`} className= {c.status ? '' : 'complete'} onClick={() => this.changeStatus(c.id)}>
                         {c.choice}
                      </li>
                       
                    ))}
                </ul>
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