import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/Completed.css'


class Complete extends Component {
    render() {
        return (
            <div id="pickles">
                <div className="completeContainer">
                    <span><span><span>
                    <h1>Complete!</h1>
                    <h1>THIS GAME'S WINNER IS:</h1> 
                    <p className="winner">{this.props.item.choice}</p>
                    </span></span></span>
                   
                </div>
                <div id="pickle1">
                    <div id="rightbrow1"></div>
                    <div id="leftbrow1"></div>
                    <div className="wholeright1"></div>
                    <div className="wholeleft1"></div>
                    <div className="righteye1"></div>
                    <div className="lefteye1"></div> 
                    <div id="smile1"></div>
        
                </div>
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