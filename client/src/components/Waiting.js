import React, { Component } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
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
            <Flipper flipKey={this.state.users.username}>
                <h1>Waiting on ...</h1>
                <ul className="list">
                {this.state.users.map(d  => (
                    <Flipped key={'item' + d.username} flipId={d.username}>
                    <li>{d.username}</li>
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