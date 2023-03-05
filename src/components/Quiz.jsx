import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function(props) {

    const results = props.trivia.results
    const [questions, setQuestions] = React.useState([])
    const [correctIds, setCorrectIds] = React.useState([])
    const [choices, setChoices] = React.useState(["", "", "", "", ""])
    const [numCorrect, setNumCorrect] = React.useState(0)
    const answerContainers = document.getElementsByClassName('answer-container')

    function generateAnswer(answer, correct) {
        return(
            {
                answer: answer,
                id: nanoid(),
                correct: correct
            }
        )
    }

    function toggleAnswer(e, indexID, answerID) {
        const choiceArr = choices
        choiceArr[indexID] = answerID
        setChoices(choiceArr)

        const t = e.target
        const p = t.parentNode
        for(let i = 0; i < p.children.length; i++){
            p.children[i].classList.remove('selected')
        }
        t.classList.add('selected')
    }

    function checkAnswers(correctAnswers, chosenAnswers) {
        // Calculate Score
        setNumCorrect(0)
        for(let i = 0; i < correctAnswers.length; i++) {
            if(correctAnswers[i] === chosenAnswers[i]) {
                setNumCorrect(prevState => prevState+1)
                for(let x = 0; x < answerContainers[i].children.length; x++) {
                    if(answerContainers[i].children[x].classList.contains('selected')){
                        answerContainers[i].children[x].classList.add('correct')
                    }

                }
            } else {
                for(let x = 0; x < answerContainers[i].children.length; x++) {
                    if(answerContainers[i].children[x].classList.contains('selected')){
                        answerContainers[i].children[x].classList.add('incorrect')
                    }

                }
            }
        }
        // Highlight Answers
    }

    React.useEffect(() => {
        for(let i = 0; i < results.length; i++) {
            // Create an array of objects containing possible answers and pass this down as a prop.
            // The <Question /> will then generate an array of element answers based off this object.
            const answers = []
            for(let x = 0; x < results[i].incorrect_answers.length; x++) {
                answers.push(generateAnswer(results[i].incorrect_answers[x], false))
            }
            answers.push(generateAnswer(results[i].correct_answer, true))
            setQuestions((prevState) => [...prevState, <Question handleClick={(e, indexID, answerID) => toggleAnswer(e, indexID, answerID)} question={results[i].question} answers={answers} correctID={answers[3].id} id={i} key={nanoid()} />])
            setCorrectIds((prevState) => [...prevState, answers[3].id])
        }
    }, [])

    return (
        <div className="quiz-container">
            {questions}
            <button className='quiz-btn' onClick={() => checkAnswers(correctIds, choices)}>Check Answers</button>
            <h1>You scored {numCorrect}/5 correct answers</h1>
        </div>
    )
}