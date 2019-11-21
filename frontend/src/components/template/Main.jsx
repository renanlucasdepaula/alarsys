import './Main.css'
import React from 'react'


export default props =>
    <React.Fragment>
        <main className="container-fluid content">
            <div className="p-3 mt-1">
                {props.children}
            </div>
        </main>
    </React.Fragment>