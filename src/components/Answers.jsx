/* eslint-disable react/prop-types */
import he from "he";

const Answers = (props) => {
    
  return (
    <div className="answers">
      {props.answers.map((el) => {
        return (
          <button key={Math.random()} className="button" onClick={props.checkAnswer}>
            {he.decode(el)}
          </button>
        );
      })}
    </div>
  );
};

export default Answers;
