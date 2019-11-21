import './Logo.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <div className="logo">
        <Link to="/">
            <div className="icon-d">
            <i className="fa fa-home fa-5x"></i>
            </div>
        </Link>
    </div>