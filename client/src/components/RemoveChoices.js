import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editStatus, nextTurn } from '../actions/fikl';
import '../styles/ElimItem.css'



class Remove extends Component {

    changeStatus = (id) => {
        editStatus(id).then(() => {
            nextTurn(this.props.username)
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.roomcode}</h1>
                <h2>Pick one you don't like: {this.props.category}</h2>
                 <ul>
                     {this.props.choices.map(c =>(
                         <li key={c.id} className= {c.status ? '' : 'complete'} onClick={() => this.changeStatus(c.id)}>
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
        roomcode: appState.listReducer.roomcode,
        choices: appState.listReducer.choices,
        category: appState.listReducer.category
    }
}


export default connect(MapStateToProps)(Remove) 