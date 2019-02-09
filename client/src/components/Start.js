import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Start extends Component {
  
  render() {
    return (
      <div>
        <h1>Fikl</h1>
        <p>Are you starting a new room?</p>
        <span className="startlink"><Link to='/newroom'>Start a New</Link></span>
        <p>Or joining an existing one?</p>
        <span className="startlink"><Link to='/joinroom'>Join a Room</Link></span>
      </div>
    )
  }
}

export default Start