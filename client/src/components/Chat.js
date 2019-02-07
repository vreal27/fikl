import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'
import { connect } from 'react-redux'


class Chat extends Component {
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
            message: this.state.message
        })
        this.setState({
            message: ''
        })
    }

    componentWillUpdate() {
        var node = this.refs.chatroom
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
      }
    
      componentDidUpdate() {
        if (this.shouldScrollBottom) {
          var node = this.refs.chatroom
          node.scrollTop = node.scrollHeight
        }
      }

    render() {
        return (
            <div className="roomwrap">
                <div className="chatbox" ref="chatroom">
                    {this.props.messages.map((m,i )=> (
                    <p key= {"message" + i} className="messagebox">
                        <span className="user">[ {m.username} ]</span>: 
                        <span className="message">{m.message}</span>
                    </p>
                   ))}
                    <form classRoom="sendmesage" onSubmit={this.handleSubmit}>
                        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
                        <button type="submit" id="submitButton"><i className="fa fa-angle-up"></i></button>
                    </form>
                </div>
            </div>
        )
    }
}



export function mapStateToProps(appState){
    return {
        username: appState.listReducer.username,
        messages: appState.listReducer.messages

    }
}

export default connect(mapStateToProps)(Chat)