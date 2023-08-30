import "./index.css";
import Plx from "react-plx";
import background from './assets/backgroundHeader.png'
import background2 from './assets/backgroundHeader1.jpeg'
import bg from './assets/bg.png'
import React from "react"
import ReactDOM from "react-dom"
import Die from './Die.jsx'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Header from './Header.jsx'


export default function App() {
    // Initialise dice state with empty array
    const [dice, setDice] = React.useState(new Array(10).fill({value: "🎲", isHeld: false, id: "",}))

    const [tenzies, setTenzies] = React.useState(false)
    
    const [isStarted, setStarted] = React.useState(false)
    const [backGroundSrc, setBackgroundSrc] = React.useState(background)
    const [changingImages, setChangingImages] = React.useState(false);
    
    // Hold dice for the user, dice component returns toggle function with id, loop over array, change specific object's isHeld property
    function holdDice(id){
    setDice(prevDice => prevDice.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                isHeld: true,
            };
        } else {
            return item;
        }
    }));
  }

  
  function changeSettings() {
    setStarted(true)
    setChangingImages(true); // Set the flag before changing images
    setTimeout(() => {
      setBackgroundSrc(background2)
      setChangingImages(false); // Reset the flag after images are changed
    }, 500); // You can adjust the timeout value as needed
  }

  React.useEffect(() => {
        const allEqual = dice.every((item) => item.isHeld === true && item.value === dice[0].value)
        if (allEqual) 
        {
            setTenzies(true)
        }
  }, [dice])

    function rollDice() {
  setDice(prevDice => prevDice.map((dice) => {
    if (!dice.isHeld) {
      let randomNumber = Math.floor(Math.random() * 6) + 1
      // In first round add id, if not there
      if (!dice.id) {
        // let randomNumber = Math.floor(Math.random() * 6) + 1
        return {
          ...dice,
          id: nanoid(),
          toggle: holdDice,
          value: randomNumber,
        }
      } else {
        return {
          ...dice,
          value: randomNumber,
        }
      }
    } else {
      return dice
    }
  }));
  }

    function newGame(){
        setDice(new Array(10).fill({value: "🎲", isHeld: false, id: "",}))
        setTenzies(false)
    }

    
    const diceElement = dice.map((dice) => {
        return <Die value={dice} />
    })
    
  return (
    <div className="header-div" id="main-id">
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            easing: "ease-in",
            properties: [
              {
                startValue: 1,
                endValue: 1.7,
                property: "scale"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 100
        }}
      >
        <img style={{ width: "100%", height:"130%" }} src={bg} alt="foreground" />
      </Plx>
      <Plx id="background-image"
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale"
              }
            ]
          }
        ]}
        style={{  
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          opacity: changingImages ? 0 : 1, // Apply opacity transition
          transition: "opacity 0.5s ease-in-out", // Adjust timing as needed
        }}
      >
        <img style={{ width: "100%", height:"100vh" }} src={backGroundSrc} alt="background" />
      </Plx>
      <Plx id="main-part"
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 0,
                endValue: 1,
                property: "opacity"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          zIndex: "300",
          top: "30vh",
          width: "100%"
        }}
      >
        {!isStarted && <div className="intro-text">
          <h1>Knighthood Rivals</h1>
          <p>Weave Your Fate with Every Roll</p>
          <button className="setting-btn" onClick={changeSettings}>START GAME</button>        
        </div>}
        {isStarted && <div id='game'>
            <main>
              {tenzies && <Confetti />}
                <div className="dice-section">
                    {tenzies ? <h1>YOU WON!</h1> : <h1>Tenzies</h1>}
                    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-wrapper">
                        { diceElement }
                    </div>
                    {tenzies ? <button onClick={newGame} className="roll-btn btn">New game</button> : <button onClick={rollDice} className="roll-btn btn">Roll</button>}
                </div>
            </main> 
        </div>}
      </Plx>
    
    </div>
  );
}

