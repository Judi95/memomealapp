import React from 'react'
import {
    Redirect
  } from "react-router-dom";


const LogoutApp = ({resetTokenAuth}) => <div>{resetTokenAuth()} <Redirect to="/"/></div>

export default LogoutApp