import React from 'react'

import './Card.css'

function Card({ number, id, setSelected, level }) {

    function showComponent() {
        setSelected({ id, number })
    }

    return (
        <div id={id} className="card-container" onClick={() => showComponent()}>
            <div className="back">
                <h2 id={`${id}-text`} >{number}</h2>
            </div>
            <div className="front"></div>
        </div >
    )
}

export default Card
