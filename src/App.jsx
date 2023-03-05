import { useState } from 'react'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'

function App() {

  const [start, setStart] = useState(false)
  const [trivia, setTrivia] = useState(getTrivia)

  function startQuiz() {
    setStart(true)
  }  

  function getTrivia() {
    fetch(`https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple&encode=base64`)
      .then(res => res.json())
      .then(data => setTrivia(data))
  }

  // https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple&encode=base64

  return (
    <div className="app-container">
      {start ? <Quiz trivia={trivia} /> : <Welcome handleClick={() => startQuiz()} />}
      <svg className="blob blob1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFFAD1" d="M42.7,-10.9C52.3,15.8,55.1,47.8,40.3,59.5C25.5,71.2,-6.9,62.6,-29.3,45.2C-51.7,27.8,-64.1,1.5,-57.5,-21C-51,-43.4,-25.5,-62,-4.5,-60.5C16.5,-59.1,33,-37.6,42.7,-10.9Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob blob2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#DEEBF8" d="M42.7,-10.9C52.3,15.8,55.1,47.8,40.3,59.5C25.5,71.2,-6.9,62.6,-29.3,45.2C-51.7,27.8,-64.1,1.5,-57.5,-21C-51,-43.4,-25.5,-62,-4.5,-60.5C16.5,-59.1,33,-37.6,42.7,-10.9Z" transform="translate(100 100)" />
      </svg>
    </div>
  )
}

export default App