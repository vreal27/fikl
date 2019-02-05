import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { postChoices } from '../actions/fikl'
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
        postChoices((this.state.choice))
        this.setState({
            choice: ''
        })
    }

    render() {

        return (
            <div>
                <h1>{this.props.match.params.roomcode}</h1>
                <h2>Picking: {this.props.category}</h2>
                <form autoComplete="off" onSubmit={this.handleSubmit}>

                    <input type="text" name="choice" value={this.state.choice} onChange={this.onChange} placeholder="Enter a choice"/>

                 </form>
                 <ul>
                     {this.props.choices.map(c =>(
                        <li key={c.id}>{c.choice}</li>
                    ))}
                </ul>
                <Link to={`/${this.props.match.params.roomcode}/remove`}>Hello</Link>
            </div>
        )

    }
}


function MapStateToProps(appState) {
    return {
        choices: appState.listReducer.choices,
        category: appState.listReducer.category,
        step: appState.listReducer.step
    }
}


export default connect(MapStateToProps)(AddChoices) 

