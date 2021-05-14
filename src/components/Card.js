import React from 'react'

import './Card.css'

function Card({ number, id, setSelected, level }) {

    function showComponent() {
        setSelected({ id, number })
    }

    return (
        <div id={id} className="card-container" style={{ cursor: 'pointer' }} onClick={() => showComponent()}>
            <h2 id={`${id}-text`} className="guessNumber" style={{ opacity: 0 }}>{number}</h2>
        </div >
    )
}

export default Card
