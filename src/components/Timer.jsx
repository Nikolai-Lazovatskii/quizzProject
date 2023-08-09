/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// Timer component

const Timer = ({ flag, handleTimeExpired }) => {
  const [timer, setTimer] = useState(30);

  // Resetting the timer

  useEffect(() => {
    setTimer(30);
  }, [flag]);

  // Timer countdown and function to be called when the timer reaches 0

  useEffect(() => {
    if (timer > 0) {
      const time = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(time); // Cleanup timeout when unmounting or resetting
    } else {
      handleTimeExpired(); // Function to handle the expiration of the timer
    }
  }, [timer]);

  // Displaying the timer value
  return (
    <div className="timer">
      {timer} 
    </div>
  );
};

export default Timer;
