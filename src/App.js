import './App.css';
import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
//import { ReactDOM, useEffect } from 'react';

const cardImages = [
  { "src" : "/img/helmet-1.png" ,matched:false},
  { "src" : "/img/potion-1.png", matched:false},
  { "src" : "/img/ring-1.png" ,matched:false},
  { "src" : "/img/scroll-1.png", matched:false},
  { "src" : "/img/shield-1.png" ,matched:false},
  { "src" : "/img/sword-1.png" ,matched:false}
]
function App() {
  //Duplicate each card once
  //Shuffle cards
  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);
  //Choices
  const [choiceOne,setChoiceOne] =useState(null)
  const [choiceTwo,setChoiceTwo] =useState(null)
  const [disabled,setDisabled] = useState(false)




  const shuffleCards = () =>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random() }))
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0)
  }
  //handle choice
  const handleChoice = (card) => {
    choiceOne? setChoiceTwo(card):setChoiceOne(card)
  }
  //Compare two selected cards
useEffect(()=>{
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src===choiceTwo.src){
     setCards(prevCard=>{
       return prevCard.map(card=>{
         if(card.src===choiceOne.src){
           return {...card,matched:true}
         }else{
           return card
         }
       })
     })
      resetTurn();
    }else{
      setTimeout(()=> {
        resetTurn();
      },1000);
    }
  }
},[choiceOne,choiceTwo])
//console.log(cards);


//Reset turn and inrcrease count
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns +1)
    setDisabled(false)
  }
  //Start a game automatically
  useEffect(()=>{
    shuffleCards();
  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = { shuffleCards }>New Game</button>

      <div className="card-grid">
         {cards.map(card =>(
          <SingleCard
           key = {card.id} 
           card={card}
           handleChoice={handleChoice}
           flipped={card===choiceOne || card===choiceTwo || card.matched}
           disabled ={disabled}
           />
         ))}
      </div>
      <p>
      Turns:{turns}
      </p>
    </div>
  );
}

export default App