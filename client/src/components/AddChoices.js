import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postChoices } from '../actions/fikl';
import '../styles/ElimItem.css'
import StrikeOut from './ElimItem'


class List extends Component {
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
        console.log(this.state.choice)
        return (
            <div>
                <form autoComplete="off" onSubmit={this.handleSubmit}>

                    <input type="text" name="choice" value={this.state.choice} onChange={this.onChange} placeholder="Enter a choice"/>

                </form>
                <ul>
                    {this.props.choices.map(c =>(
                        <StrikeOut key={c.id} {...c}/>
                    ))}
                </ul>
            </div>
        )

    }
}


function MapStateToProps(appState) {
    console.log('theState', appState)
    return {
        choices: appState.listReducer.choices
    }
}


export default connect(MapStateToProps)(List) 

