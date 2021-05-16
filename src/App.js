import React, { useState, useEffect } from 'react'
import Home from './pages/HomeScreen';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles({
  slider: {
    maxWidth: 300,
    margin: 50,
    color: '#3d6aff'
  },
});

function App() {
  const classes = useStyles();
  let [loading, setLoading] = useState(true)
  let [currLevel, setCurrLevel] = useState(2)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  function level(value) {
    resetCards()
    setCurrLevel(value)
    return `${value}`;
  }

  function resetCards() {
    let containers = document.getElementsByClassName("card-container")
    for (let j = 0; j < containers.length; j++) {
      containers[j].className = 'card-container'
      containers[j].setAttribute('onclick', '() => showComponent()')
    }
  }

  function hidde() {
    return document.getElementById('animation').style.display = "none"
  }

  return (
    <div className="mainApp">
      {loading ?
        <BeatLoader color="#7fffd4" loading={loading} size={15} /> :
        <>
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
              value={currLevel}
              onChange={(_, value) => setCurrLevel(value)}
              className={classes.slider}
            />
          </div>
          < Home level={currLevel} setCurrLevel={setCurrLevel} />
          <div id="animation" className="animation" onClick={() => hidde()}>
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
            <div className="congrat">
              <h2>Parabéns você conseguiu!</h2>
              <h4>Você será direcionado para a próxima fase</h4>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
