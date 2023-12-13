import React, { useState, useEffect } from 'react';

const RandomText = ({text}) => {
    const [name, setName] = useState(text);
    let intervalId = null;
    const [boolean, setBoolean] = useState(false);
    
    const handleMouseOver = () => {
      if(!boolean){
        let iteration = 0;
  
        intervalId = setInterval(() => {
          setName((prevName) =>
            prevName
              .split('')
              .map((letter, index) => {
                if (index < iteration) {
                  return name[index];
                }else{
                  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
              })
              .join('')
          );
          if (iteration >= name.length) {
            clearInterval(intervalId);
            setBoolean(false);
          }
  
          iteration += 1 / 3;
        }, 30);
        setBoolean(true);
      }
    };
    useEffect(() => {
      handleMouseOver();
    }, []);
  return (
    <span onMouseOver={handleMouseOver} className='blue-gradient_text font-semibold drop-shadow'>{name}</span>
  )
}

export default RandomText