import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, doneAdding } from '../actions/fikl'
import '../styles/ElimItem.css'


class AddChoices extends Component {
    state = {
        choice: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        addItem(this.props.username, this.state.choice, this.props.room.code)
        .then(() => {
            this.setState({
                choice: ''
            })
        })
    }

    sayDone = (e) => {
        e.preventDefault()
        doneAdding(this.props.room.code)
    }

    render() {
        return (
            <div>
                <h1>{this.props.room.code}</h1>
                <h2>Picking: {this.props.room.category}</h2>
                <form autoComplete="off" onSubmit={this.handleSubmit}>

                    <input 
                        type="text" 
                        name="choice" 
                        value={this.state.choice} 
                        onChange={this.onChange} 
                        placeholder="Enter a choice"
                    />

                 </form>
                 <button onClick={this.sayDone}>I'm done adding!</button>
                 <ul>
                     {this.props.room.items.map((c, i) =>(
                        <li key={`${c.id}${i}`}>{c.choice}</li>
                    ))}
                </ul>
            </div>
        )

    }
}


function MapStateToProps(appState) {
    return {
        username: appState.listReducer.username,
        room: appState.listReducer.room,
        step: appState.listReducer.step
    }
}


export default connect(MapStateToProps)(AddChoices) 

