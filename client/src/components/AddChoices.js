import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, doneAdding } from '../actions/fikl'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import '../styles/AddChoices.css'



class AddChoices extends Component {
    state = {
        choice: '',
        value: this.props.room.code,
        copied: false
    }


    copyCode = ({target: {value}}) => {
        this.setState({value, copied: false})
    }

   onCopy = () => {
       this.setState({copied: true})
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
            <div id="addContainer">
            

                <textarea onChange={this.copyCode} value={this.state.value} className="rotate-scale-up"/>
                <CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
                    <button>Copy this code!</button>
                </CopyToClipboard>
              



                <h2>Picking: {this.props.room.category}</h2>
                <div className="addInstructions">
                    That up there is your room code. Anybody that wants to join this particular room needs to have this code.
                </div>
                {/* <h2>Add your favorite {this.props.room.category}</h2> */}
                <form autoComplete="off" onSubmit={this.handleSubmit} className="addForm">
                    <div className="addInstructions">
                        And here, you can add as many choices as you like. Go nuts! Throw in anything you can think of. Big chain restaurants, tiny boutiques, blockbuster movies, or the little show that could. It's up to you! We'll narrow it down in a bit. Just tell us when you're done, then sit back and relax.
                    </div>
                    <input 
                        type="text" 
                        name="choice" 
                        value={this.state.choice} 
                        onChange={this.onChange} 
                        placeholder={`Add a ${this.props.room.category}`}
                        className="addInput"
                    />

                 </form>
                 <button onClick={this.sayDone} className="addButton">I'm done adding!</button>
                 <ul id="addedItems">
                     {this.props.room.items.map((c, i) =>(
                       <li key={`${c.id}${i}`} className="choice">{c.choice}</li>
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

