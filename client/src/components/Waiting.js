import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import '../styles/ElimItem.css'
import { connect } from 'react-redux'


class Waiting extends Component {
    state = {
        users: []
    }


    shuffle = () => {
        this.setState({
            users: shuffle(this.props.users)
        })
    }

    componentDidMount(){
        setInterval(this.shuffle, 1000)
    }

    render() {
        return (
        
            <div id="waitingcontainer">
                <div id="box">
                    <h1 id="waiting">Waiting</h1>
                    <p id="ellipsis"></p>
                </div>
                <div id="loadingbar">
                    <div id="pickle">
                        <div id="rightbrow"></div>
                        <div id="leftbrow"></div>
                        <div className="wholeright"></div>
                        <div className="wholeleft"></div>
                        <div className="righteye"></div>
                        <div className="lefteye"></div> 
                        <div id="smile"></div>
                    </div>
                    <div className="step" id="s1"></div>
                    <div className="step" id="s2"></div>
                    <div className="step" id="s3"></div>
                </div>
            </div>
        )
    }
}

export function mapStateToProps(appState){
    return {
        users: appState.listReducer.users
    }
}


export default connect(mapStateToProps)(Waiting)