import data from './components/data'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [ inpValue, setInpValue ] = useState(' ')
  const [ filtered , setFiltered ] = useState(data.questions)

  const updateInputValue = (e) => {
    e.preventDefault()
    setInpValue(e.target.value)
  };

  useEffect(() => {
    let searchArray = inpValue.split(' ')
    for ( let i in searchArray ) {
      setFiltered(data.questions.filter(item => item.title.toLowerCase().includes(searchArray[i].toLowerCase())))
    }
  }, [inpValue]);

  return (
    <div className="App">
      <h1>FAQ Page</h1>
      <form>
        <input className='MainInput' onChange={(e) => updateInputValue(e)}></input>
        <button>search</button>
      </form>
     <div className='QuestionsDisplay'></div>
      <p>{filtered.map( item => <p key={item.title}>{item.title}</p>)}</p>
    </div>
  );
}

export default App;
