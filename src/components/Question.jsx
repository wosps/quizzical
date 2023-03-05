import React from 'react'
import { nanoid } from 'nanoid'

export default function(props) {

    const [answersArr, setAnswersArr] = React.useState([])

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    React.useEffect(() => {
        const shuffledAnswers = shuffleArray(props.answers)
        const correctID = props.correctID
        let answers = []
        for(let i = 0; i < shuffledAnswers.length; i++) {
            const indexID = props.id
            const answerID = shuffledAnswers[i].id
            answers.push(
                <p onClick={(e) => props.handleClick(e, indexID, answerID)} key={nanoid()}>{atob(props.answers[i].answer)}</p>
            )
            setAnswersArr(answers)
        }
    }, [])

    return (
        <div className="question-container">
            <h1>{atob(props.question)} {props.correct}</h1>
            <div className="answer-container">
                {answersArr}
            </div>
        </div>
    )
}