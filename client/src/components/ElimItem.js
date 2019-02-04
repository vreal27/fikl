import React, { Component } from 'react'
import { editStatus} from '../actions/fikl'
import "../styles/ElimItem.css"


class StrikeOut extends Component {

    changeStatus = (e) => {
        editStatus(this.props.id)
    }

    render() {
        console.log('props',this.props)
        return (
            <div>
                <li className= {this.props.status ? '' : 'complete'} onClick={this.changeStatus}>
                    {this.props.choice}
                 </li>
            </div>
        )
    }
}




export default StrikeOut
