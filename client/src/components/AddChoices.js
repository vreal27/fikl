import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, nextTurn } from '../actions/fikl'
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
        addItem(this.props.username, this.state.choice, this.props.roomcode)
        .then(() => {
            nextTurn(this.props.username)
        })
        this.setState({
            choice: ''
        })
    }

    render() {

        return (
            <div>
                <h1>{this.props.roomcode}</h1>
                <h2>Picking: {this.props.category}</h2>
                <form autoComplete="off" onSubmit={this.handleSubmit}>

                    <input type="text" name="choice" value={this.state.choice} onChange={this.onChange} placeholder="Enter a choice"/>

                 </form>
                 <ul>
                     {console.log('rendertest', this.props.choices)}
                     {this.props.choices.map((c, i) =>(
                        <li key={"choice" + i}>{c.choice}</li>
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
        category: appState.listReducer.category,
        roomcode: appState.listReducer.roomcode,
        step: appState.listReducer.step
    }
}


export default connect(MapStateToProps)(AddChoices) 

