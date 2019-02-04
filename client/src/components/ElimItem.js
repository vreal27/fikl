import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../styles/ElimItem.css"


class Delete extends Component {
    deleteChoice = (e) => {
        
    }

    render() {
        return (
            <div>
                <li className= {this.props.status ? '' : 'complete'} onClick={this.changeStatus}>
                    {this.props.text}
                <button className="delete" onClick ={this.deleteItem}>X</button>
                 </li>
            </div>
        )
    }
}


function MapStateToProps(appState) {
    return {

    }
} 


export default connect(MapStateToProps)(Delete)
