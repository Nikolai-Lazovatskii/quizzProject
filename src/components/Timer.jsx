/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";


// Компонент таймера

const Timer = ({flag, handleTimeExpired}) => {

  const [timer, setTimer] = useState(30)


  // Обнуление таймера

  useEffect(() => {
    setTimer(30)
  }, [flag])


  // Счет таймера и функция при окончании
  
  useEffect(() => {
    if (timer > 0) {
        const time = setTimeout(() => {setTimer(timer - 1)}, 1000)
        return () => clearTimeout(time)
    } else {
        handleTimeExpired()
    }
  }, [timer])
    

  return (
    <div className="timer">
      {timer}
    </div>
  )
}

export default Timer
