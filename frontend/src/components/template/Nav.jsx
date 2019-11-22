import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'


export default props =>
    <div className="menu-area">
        <nav className="menu">

            <Link to="/alarm" >
                <span>Alarmes <i className="fa fa-clock-o"></i></span>

            </Link>

            <Link to="/equipment" >
                <span>Equipamentos <i className="fa fa-server"></i></span>
            </Link>
            <Link to="/alarmat" >
                <span>Alarmes Atuados <i className="fa fa-thumbs-o-up"></i></span>
            </Link>
            <Link to="/management" >
                <span>Gerenciamento <i className="fa fa-area-chart"></i></span>
            </Link>
        </nav>
    </div>