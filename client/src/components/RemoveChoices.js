import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editStatus, nextTurn } from '../actions/fikl';
import '../styles/ElimItem.css'



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
            <div>
                <h1>{this.props.room.code}</h1>
                <h2>Pick one you don't like: {this.props.room.category}</h2>
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