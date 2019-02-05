import React, { Component } from 'react'
import { connect } from 'react-redux'


class Chat extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}



export function mapStateToProps(appState){
    return {
        username: appState.listReducer.username,
        
    }
}