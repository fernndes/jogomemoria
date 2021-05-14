import React, { useState, useEffect } from 'react'
import Home from './pages/HomeScreen';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  slider: {
    maxWidth: 300,
    margin: 50,
    color: '#3d6aff'
  },
});

function App() {
  const classes = useStyles();
  const [diff, setDiff] = useState(1)

  function level(value) {
    resetCardsOpacity()
    setDiff(value)
    return `${value}`;
  }

  function resetCardsOpacity() {
    let cards = document.getElementsByClassName("guessNumber")
    let containers = document.getElementsByClassName("card-container")
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.opacity = 0
    }
    for (let j = 0; j < containers.length; j++) {
      containers[j].setAttribute('onclick', '() => showComponent()')
    }
  }

  return (
    <div className="mainApp">
      <div className="header">
        <h2>Jogo da memória</h2>
        <Slider
          defaultValue={2}
          getAriaValueText={level}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={2}
          marks
          min={2}
          max={10}
          className={classes.slider}
        />
      </div>
      < Home level={diff} />
    </div>
  );
}

export default App;
