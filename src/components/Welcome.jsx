import React from 'react'

export default function(props) {
    return (
        <main className='welcome-container'>
            <h1 onClick={props.handleClick}>Quizzical</h1>
            <p>Random Video Game Trivia!</p>
            <button className="quiz-btn" onClick={props.handleClick}>Start Quiz</button>
        </main>
    )
}