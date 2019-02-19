import React, { Component } from 'react'
import AddChoices from './AddChoices'
import RemoveChoices from './RemoveChoices'
import Completed from './Completed'
import Waiting from './Waiting'
import { addMessage } from '../actions/fikl.js'
import { connect } from 'react-redux'
import '../styles/Chat.css'

class Step extends Component {
    state = {
        message: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        addMessage({
            message: this.state.message,
            roomcode: this.props.match.params.roomcode
        })
        this.setState({
            message: ''
        })
    }


    render() {
        console.log('messages', this.props.messages)
       
        if(this.props.step === "add"){
            return (
                <div className="chatcontainer">
                    
                    <AddChoices/>

                    <div className="roomwrap">
                    
                       
                        <div className="chatbox" ref="chatroom">
                        <h1 className="slide-out-fwd-center">[ Fikl Chat ]</h1>


                            {this.props.messages.map((m,i )=> (
                            <p key= {"message" + i} className="messagebox">
                                <span className="user">[ {m.user} ]</span>: 
                                <span className="message">{m.message}</span>
                            </p>
                        ))}
                        
                        </div>


                        <form className="sendmessage" onSubmit={this.handleSubmit}>
                                <input type="text" id="submitform" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
                                <button type="submit" id="submitButton"><i className="fa fa-angle-up"></i></button>
                    
                        </form>
                    </div>


                </div>
                
                )
        } else if (this.props.step === "remove"){
            return (
                <div className="chatcontainer">
                    <RemoveChoices/>

                     <div className="roomwrap">
                    
                       
                        <div className="chatbox" ref="chatroom">
                        <h1 className="slide-out-fwd-center">[ Fikl Chat ]</h1>


                            {this.props.messages.map((m,i )=> (
                            <p key= {"message" + i} className="messagebox">
                                <span className="user">[ {m.user} ]</span>: 
                                <span className="message">{m.message}</span>
                            </p>
                        ))}
                        
                        </div>


                        <form className="sendmessage" onSubmit={this.handleSubmit}>
                                <input type="text" id="submitform" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
                                <button type="submit" id="submitButton"><i className="fa fa-angle-up"></i></button>
                    
                        </form>
                    </div>
                </div>
                
                )
        } else if (this.props.step === "complete"){
            return (<Completed/>)
        } else {
            return (<Waiting/>)

        }

        

    }
}


export function mapStateToProps(appState, ownProps){
    const roomcode = ownProps.match.params.roomcode

    return {
        step: appState.listReducer.step,
        username: appState.listReducer.username,
        messages: appState.listReducer.messages.filter(message => message.roomcode === roomcode),
        roomcode: roomcode
    }
} 


export default connect(mapStateToProps)(Step)