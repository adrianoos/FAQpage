import data from './components/data'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const savedShowAnswer = JSON.parse(localStorage.getItem('showAnswer'))
  const [ inpValue, setInpValue ] = useState(' ')
  const [ filtered , setFiltered ] = useState(data.questions)
  const [ showAnswer, setShowAnswer ] = useState(savedShowAnswer || '')
  const [ groupDisplay, setGroupDisplay ] = useState('All')

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
    window.localStorage.setItem('showAnswer', JSON.stringify(id))
  } else {
    setShowAnswer('')
    window.localStorage.setItem('showAnswer', JSON.stringify(''))
   }
  };

  const switchGroupDisplay = (id) => {
    if (id == 'All') {
      setFiltered(data.questions)
      setGroupDisplay('All')
    }
    else { setFiltered(data.questions.filter(item => item.groupId == id))
           setGroupDisplay(id)
    }
  };

  return (
    <div className="App">
      <h1>FAQ Page</h1>
      <form>
        <input className='MainInput' onChange={(e) => updateInputValue(e)}></input>
        <button>search</button>
      </form>
         <div id='questionGroups'>
         <button className={groupDisplay == 'All' ? 'groupsButtonFilled' : 'groupsButton'} onClick={() => switchGroupDisplay('All')}>All</button>
           { Object.values(data.groups).flat().map( item =>
            <button className={groupDisplay == item.id ? 'groupsButtonFilled' : 'groupsButton'} key={item.id} onClick={() => switchGroupDisplay(item.id)}>{item.name}</button>
            )}
         </div>
     <div className='QuestionsDisplay'>
     {filtered.map( item =>
       <div key={item.id}>
            <h1 className='questionParagraph' onClick={() => changeDisplay(item.id)} id={item.id} key={item.title}>{item.title}</h1>
            {showAnswer == item.id ? <div key={item.id} dangerouslySetInnerHTML={{__html: item.content}}></div> : ''}
      </div>)}
     </div>
    </div>
  );
}

export default App;
