import React, { Component } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import shuffle from 'lodash.shuffle'
import '../styles/ElimItem.css'
import { connect } from 'react-redux'


class Waiting extends Component {
    state = {
        users: [1,2,3,4,5]
    }


    shuffle = () => {
        this.setState({
            users: shuffle(this.state.users)
        })
    }

    componentDidMount(){
        setInterval(this.shuffle, 2000)
    }

    render() {
        return (
            <Flipper flipKey={this.state.users.join("")}>
                <h1>Waiting on ...</h1>
                <ul className="list">
                {this.state.users.map(d  => (
                    <Flipped key={'item' + d} flipId={d}>
                    <li>{d}</li>
                    </Flipped>
                ))}
                </ul>
            </Flipper>
        )
    }
}

export function mapStateToProps(appState){
    return {
        users: appState.listReducer.users
    }
}


export default connect(mapStateToProps)(Waiting)