import classes from './App.module.css';
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
const App = () => {
  const [qApi, setQapi] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://quiz-rest-api-heroku.herokuapp.com/api/q")
      .then(res => res.json())
      .then(data => setQapi(data));
    setQuestions(qApi);
  }, [questions, qApi])
  
  const checkAnsHandler = (isCorrect) => {
    const nextQ = currentQ + 1;
    if (isCorrect) {
      setCurrentQ((prevState) => prevState + 1);
      setScore((prevState) => prevState + 1);
      if (nextQ === questions.length) {
        setShowScore(true);
      }
    }
    else {
      setError(true);
      setCurrentQ((prevState) => prevState + 1);
      if (nextQ === questions.length) {
        setShowScore(true);
      }
    }
  }
  const playagainHandler = () => {
    setShowScore(false);
    setCurrentQ(0);
    setScore(0);
  }
  const errorHandler = () => {
    setError(false);
  }
  return (
    <>
      {error && <Modal handler={errorHandler} score={score} />}
      {questions ?
        <div className={classes.Ui}>
          {
            showScore ?
               <div className={classes.score}>
                <span>score {score}</span>
                <button onClick={playagainHandler}>play again</button>
              </div>
              :
              <>
                <div className={classes.box}>
                  <div className={classes.questionSection}>
                    <span>{currentQ + 1} / {questions.length} </span>
                    <div className={classes.question}>{questions[currentQ].questionText}</div>
                  </div>
                  <div className={classes.optionSection}>
                    {questions[currentQ].answerOptions.map((ansOpt, i) => <p key={i}
                      onClick={() => checkAnsHandler(ansOpt.isCorrect)}
                    >{ansOpt.answerText}</p>)}
                  </div>
                </div>
              </>
          }
        </div>
        : ('')}
    </>
  );
}

export default App;
