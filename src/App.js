import data from './components/data'
import './App.css'
import { useState } from 'react'

function App() {

  const [ query, setQuery ] = useState('')
  const [ inpValue, setInpValue ] = useState('')

  console.log(inpValue)

  const updateInputValue = (e) => {
    setInpValue(e.target.value)
  }

  return (
    <div className="App">
      <h1>FAQ Page</h1>
      <form>
        <input className='MainInput' onChange={updateInputValue}></input>
        <button>search</button>
      </form>
     <div className='QuestionsDisplay'></div>
      <p>{data.questions.map( item => <p>{item.title}</p>)}</p>
    </div>
  );
}

export default App;
