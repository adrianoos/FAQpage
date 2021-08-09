import data from './components/data'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [ inpValue, setInpValue ] = useState(' ')
  const [ filtered , setFiltered ] = useState(data.questions)
  const [ showAnswer , setShowAnswer ] = useState('')

  const updateInputValue = (e) => {
    e.preventDefault()
    setInpValue(e.target.value)
  };

  useEffect(() => {
    let searchArray = inpValue.split(' ')
    for ( let i in searchArray ) {
      if ( searchArray[i].length > 0 ) {
        setFiltered(data.questions.filter(item => item.title.toLowerCase().includes(searchArray[i].toLowerCase())))
      }
    }
  }, [inpValue]);

  const changeDisplay = (id) => {
  if (id !== showAnswer) {
    setShowAnswer(id)
  } else { setShowAnswer('') }
  };

  return (
    <div className="App">
      <h1>FAQ Page</h1>
      <form>
        <input className='MainInput' onChange={(e) => updateInputValue(e)}></input>
        <button>search</button>
      </form>
     <div className='QuestionsDisplay'>
     {filtered.map( item =>
       <div>
            <h1 className='questionParagraph' onClick={() => changeDisplay(item.id)} id={item.id} key={item.title}>{item.title}</h1>
            {showAnswer == item.id ? <p>{item.content}</p> : ''}
      </div>)}
     </div>
    </div>
  );
}

export default App;