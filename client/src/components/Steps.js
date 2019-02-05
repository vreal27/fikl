import React, { Component } from 'react'
import AddChoices from './AddChoices'
import RemoveChoices from './RemoveChoices'
import Completed from './Completed'
import Waiting from './Waiting'
import { connect } from 'react-redux'

class Step extends Component {
    render() {
        if(this.props.step === "add"){
            return (<AddChoices/>)
        } else if (this.props.step === "remove"){
            return (<RemoveChoices/>)
        } else if (this.props.step === "complete"){
            return (<Completed/>)
        } else {
            return (<Waiting/>)

        }
    }
}


export function mapStateToProps(appState){
    return {
        step: appState.listReducer.step
    }
} 


export default connect(mapStateToProps)(Step)