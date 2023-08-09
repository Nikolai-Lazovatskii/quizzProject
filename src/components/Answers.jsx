/* eslint-disable react/prop-types */
import he from "he"; // Importing the he library to decode HTML entities

const Answers = (props) => {
  // Rendering answer options

  return (
    <div className="answers">
      {props.answers.map((el) => {
        return (
          // Creating buttons for each answer and applying HTML decoding
          <button key={Math.random()} className="button" onClick={props.checkAnswer}>
            {he.decode(el)}
          </button>
        );
      })}
    </div>
  );
};

export default Answers;
