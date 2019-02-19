import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Start.css'

class Start extends Component {
  
  render() {
    return (
      <div className="startcontainer">
        <h1 id="logo">Fikl</h1>
        <div id="explainStart">
          <span id="introtext">Here's a classic pickle:</span> Everyone wants to do <span className="emphasis">something</span> but nobody can pick what exactly to <span className="emphasis">do</span>. Enter fikl, which you're visiting right this second. We're going to help you make a decision by listing every possible thing you guys/gals/other pals can think of, then take turns eliminating one option at a time. <br />We're going to need a room for everybody to join, first. So:
        </div>
        <p>Are you starting a new room?</p>
        <span className="startlink"><Link to='/newroom'>Start a New</Link></span>
        <p>Or joining an existing one?</p>
        <span className="startlink"><Link to='/joinroom'>Join a Room</Link></span>
      </div>
    )
  }
}

export default Start