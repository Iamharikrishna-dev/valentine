import React, { useState, } from 'react';
  import { motion } from 'framer-motion';
  import './App.css';
  
  
  const App = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [noButtonDodgeCount, setNoButtonDodgeCount] = useState(0);
    const maxDodges = 5;
  
    const questions = [
      'Will you be my Valentine? 💝',
      'Would you like to go on a date with me? 🌹',
      'Can I have a hug? 🤗'
    ];
  
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = 3 + Math.random() * 1 + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    };
  
    const celebrateAcceptance = () => {
      for (let i = 0; i < 200; i++) {  // Increased number of hearts
        setTimeout(createHeart, i * 50); 
      }
    };
  
    const handleYes = () => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(prev => prev + 1);
      } else {
        setQuestionIndex('final');
        celebrateAcceptance();
      }
    };
  
    const handleNo = () => {
      if (noButtonDodgeCount >= maxDodges) {
        setQuestionIndex('rejected');
      }
    };
  
    const dodgeNo = (e) => {
      if (noButtonDodgeCount < maxDodges) {
        e.target.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px)`;
        setNoButtonDodgeCount(prev => prev + 1);
      }
    };
  
    const resetQuestions = () => {
      setQuestionIndex(0);
      setNoButtonDodgeCount(0);
    };
  
    return (
      <div className="card">
        {questionIndex !== 'final' && questionIndex !== 'rejected' && (
          <motion.div
            className="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="message">{questions[questionIndex]}</h1>
            <div className="btn-container">
              <button className="btn" onClick={handleYes}>Yes!</button>
              <button className="btn no" onClick={handleNo} onMouseOver={dodgeNo} onTouchStart={dodgeNo}>No</button>
            </div>
          </motion.div>
        )}
  
        {questionIndex === 'final' && (
          <motion.div
            className="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            You've made me the happiest person ever! ❤️
          </motion.div>
        )}
  
        {questionIndex === 'rejected' && (
          <motion.div
            className="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            😢 But... but... please?
            <button className="btn" onClick={resetQuestions}>Ok, let me try again</button>
          </motion.div>
        )}
      </div>
    );
  };
  
  export default App;
  