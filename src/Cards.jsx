import React from "react";

function Card(props){
    return(
      <>
      <div className='cards'>
        <div className='card'>
        <a href ={props.link} target='_blank' rel='noopener noreferrer'>
          <img src={props.imgsrc} 
            alt="myPic" 
            className='card__img' 
            
          />
          </a>
          <div className='card__info'>
            <span className='card__category'> {props.title} </span>
            <h3 className='card__title'> {props.sName} </h3>
            <a href={props.link}
              target='_blank' rel='noopener noreferrer'>
              <button> Watch Now </button>
            </a>
          </div>
        </div>
      </div>
    </>
    )
  }
  
export default Card;