import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postChoices, editStatus } from '../actions/fikl';
import '../styles/ElimItem.css'



class Remove extends Component {
    state = {
        choice: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        postChoices((this.state.choice))
        this.setState({
            choice: ''
        })
    }

    changeStatus = (id) => {
        editStatus(id)
    }

    render() {
        return (
            <div>
                <h1>{this.props.match.params.roomcode}</h1>
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
        choices: appState.listReducer.choices,
        category: appState.listReducer.category
    }
}


export default connect(MapStateToProps)(Remove) 