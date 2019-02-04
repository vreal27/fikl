import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../styles/ElimItem.css"


class StrikeOut extends Component {
    deleteChoice = (e) => {
        deleteIt(this.props.id)
    }

    changeStatus = (e) => {
        editStatus(this.props.id)
    }

    render() {
        return (
            <div>
                <li className= {this.props.status ? '' : 'complete'} onClick={this.changeStatus}>
                    {this.props.choice}
                <button className="delete" onClick ={this.deleteIt}>X</button>
                 </li>
            </div>
        )
    }
}




export default StrikeOut
