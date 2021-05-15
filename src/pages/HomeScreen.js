import React, { useEffect, useState, useRef } from 'react'

import Card from '../components/Card'
import './HomeScreen.css'

function Home({ level }) {
    const [cards, setCards] = useState([])
    const [selected, setSelected] = useState(null)
    const [count, setCount] = useState(0)
    let previous = useRef()

    useEffect(() => {
        previous.current = selected
    })
    let previousSelected = previous.current

    useEffect(() => {
        if (!previousSelected && !selected) return
        let component22 = document.getElementById(`${selected.id}`)
        component22.className += ' flip'
        if (!previousSelected && !!selected) return
        let component11 = document.getElementById(`${previousSelected.id}`)
        component11.className += ' flip'
        if (previousSelected.id !== selected.id && previousSelected.number === selected.number) {
            component11.setAttribute('onclick', 'alert("Combinação já encontrada")')
            component22.setAttribute('onclick', 'alert("Combinação já encontrada")')
            setSelected(null)
            previous.current = null
            setCount(value => value + 1)
            component11.className += ' found'
            component22.className += ' found'
        } else {
            if (!!previousSelected && !!selected) {
                setTimeout(() => {
                    component22.className = 'card-container'
                    component11.className = 'card-container'
                }, 1000)
            }
            previous.current = null
        }
    }, [selected, previousSelected])

    useEffect(() => {
        setSelected(null)
        previous.current = null
        let newCards = []
        for (let i = 0; i < level; i++) {
            let card = memoryCards(i)
            newCards.push(card)
            newCards.push(card)
        }
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(newCards)
        setCards(newCards)
    }, [level])

    useEffect(() => {
        if (count === level) {
            if (alert('Parabéns você conseguiu!')) { }
            else window.location.reload();
        }
    }, [count, level])

    function memoryCards(number) {
        return {
            number: number
        }
    }

    return (
        <div
            id="container"
            className="container"
            style={{ gridTemplateColumns: `repeat(${level / (level / 4)}, 1fr)` }}
        >
            {cards.map((item, idx) => (
                <Card key={idx} id={idx} number={item.number} level={level} setSelected={setSelected} />
            ))}
        </div>
    )
}

export default Home
