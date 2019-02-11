import React, { Component } from 'react'
import { connect } from 'react-redux'


class Complete extends Component {
    render() {
        return (
            <div>
                <h1>Complete!</h1>
                <h1>THIS GAME'S WINNER IS: {this.props.item.choice}</h1>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    const finalItem = appState.listReducer.room.items.find(item => item.status === true)
    return {
        room: appState.listReducer.room,
        item: finalItem
    }
}

export default connect(mapStateToProps)(Complete)