import data from './components/data'
import './App.scss'
import { useState, useEffect } from 'react';
import Animate from 'react-smooth';

function App() {

  const savedShowAnswer = JSON.parse(localStorage.getItem('showAnswer'))
  const { groups, questions } = data
  const [ inpValue, setInpValue ] = useState(' ')
  const [ filtered , setFiltered ] = useState(questions)
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
        setFiltered(questions.filter(item => item.title.toLowerCase().includes(searchArray[i].toLowerCase())))
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
      setFiltered(questions)
      setGroupDisplay('All')
    }
    else { setFiltered(questions.filter(item => item.groupId == id))
           setGroupDisplay(id)
    }
  };

  return (
    <div className="App">
      <h1 id='Header'>FAQ Section</h1>
        <form>
          <input className='MainInput' placeholder={'Search'} onChange={(e) => updateInputValue(e)}></input>
        </form>
          <div id='questionGroups'>
            <button className={groupDisplay == 'All' ? 'groupsButtonFilled' : 'groupsButton'} onClick={() => switchGroupDisplay('All')}>All</button>
             { Object.values(groups).flat().map( item =>
            <button className={groupDisplay == item.id ? 'groupsButtonFilled' : 'groupsButton'} key={item.id} onClick={() => switchGroupDisplay(item.id)}>{item.name}</button>
            )}
         </div>
         <div className='QuestionsDisplay'>
         {filtered.map( item =>
           <div key={item.id}>
             <h1 className='questionParagraph' onClick={() => changeDisplay(item.id)} id={item.id} key={item.title}>{item.title}</h1>
             {showAnswer == item.id ?
               <Animate to="1" from="0" attributeName="opacity">
                  <div key={item.id} dangerouslySetInnerHTML={{__html: item.content}}></div>
               </Animate>
             : ''}
      </div>)}
     </div>
    </div>
  );
}

export default App;
