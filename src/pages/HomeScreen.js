import React, { useEffect, useState, useRef } from 'react'

import Card from '../components/Card'
import './HomeScreen.css'

function Home({ level, setCurrLevel }) {
    const [cards, setCards] = useState([])
    const [selected, setSelected] = useState(null)
    const [found, setFound] = useState([])

    let previous = useRef()

    useEffect(() => {
        previous.current = selected
    })
    let previousSelected = previous.current

    useEffect(() => {
        console.log(found)
        let pending = true
        for (let h = 0; h < level; h++) {
            let notFound = found.filter(elem => elem.number === h)
            if (notFound.length === 0) {
                pending = true
            } else {
                pending = false
            }
        }
        if (!pending) {
            setFound([])
            document.getElementById('animation').style.display = 'flex'
            setCurrLevel(value => value === 10 ? 2 : value + 2)
        }
    }, [found, level, setCurrLevel])

    useEffect(() => {
        if (!previousSelected && !selected) return
        let component22 = document.getElementById(`${selected.id}`)
        component22.className += ' flip'
        if (!previousSelected && !!selected) return
        let component11 = document.getElementById(`${previousSelected.id}`)
        component11.className += ' flip'
        if (previousSelected.id !== selected.id && previousSelected.number === selected.number) {
            setFound(value => [...value, selected, previousSelected])
            setSelected(null)
            component11.setAttribute('onclick', 'alert("Combinação já encontrada")')
            component22.setAttribute('onclick', 'alert("Combinação já encontrada")')
            previous.current = null
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
        setFound([])
    }, [level])



    function memoryCards(number) {
        return {
            number: number
        }
    }

    function resize() {
        if (window.innerWidth > 400) {
            return `repeat(${level / (level / 4)}, 1fr)`
        } else if (level > 4) {
            return `repeat(${level / (level / 4)}, 1fr)`
        } else {
            return `repeat(${0.5 * level / (level / 4)}, 1fr)`
        }
    }

    return (
        <div
            id="container"
            className="container"
            style={{
                gridTemplateColumns: resize()
            }}
        >
            {cards.map((item, idx) => (
                <Card key={idx} id={idx} number={item.number} level={level} setSelected={setSelected} />
            ))}
        </div>
    )
}

export default Home
