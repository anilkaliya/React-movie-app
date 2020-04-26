import React ,{useState} from 'react'
import { connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './nav.css'


function Navigate(props) {


    
    return (

      <ul >
        <li>
        <Link to ="/">Movies</Link>
        </li>
        <li>
        <Link to ="/create">{props.isAuthenticated && 'Add Movie'}</Link>
        </li>
        <li>
        <Link style={{float:"right"}}to="/signup">{!props.isAuthenticated && 'Signup'}</Link>
        </li>
        <li>
        <Link to ="/login"> {!props.isAuthenticated && 'Login'}</Link>
        </li>
      </ul>
    

  
 
  

    )
}

const mapstatetoProps=state=>{
  return {
  isAuthenticated:state.userData.isAuthenticated
}
}

export default connect(mapstatetoProps)(Navigate);