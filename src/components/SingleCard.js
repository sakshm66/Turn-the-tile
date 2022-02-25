//import React from 'react';
import  './SingleCard.css';
export default function SingleCard({card,handleChoice,flipped,disabled}){
    const handLeClick = () =>{
        if(!disabled){
            handleChoice(card)
        }
        
    }
  return (
    <div className = "card" key= {card.id}>
               <div className={flipped?"flipped": " "}>
                  <img className="front" alt="card front" src= {card.src}/>
                  <img className = "back" src="/img/cover.png"
                   onClick = {handLeClick}
                   alt= "card back"/>
               </div>
     </div>
  )
};
