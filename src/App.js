import data from './data/data'
import './App.scss'
import { useState, useEffect } from 'react';
import Animate from 'react-smooth';

function App() {

  const savedShowAnswer = JSON.parse(localStorage.getItem('showAnswer'))
  const { groups, questions } = data
  const [ inpValue, setInpValue ] = useState('')
  const [ filtered , setFiltered ] = useState(questions)
  const [ showAnswer, setShowAnswer ] = useState(savedShowAnswer || '')
  const [ groupDisplay, setGroupDisplay ] = useState('All')

  const updateInputValue = (e) => {
     setInpValue(e.target.value)
  };

useEffect(() => {
  if (inpValue) {
    const searchArray = inpValue.split(' ')
    for (let i in searchArray) {
      setFiltered(questions.filter(item => item.title.toLowerCase().includes(searchArray[i].toLowerCase())
      && item.title.toLowerCase().includes(searchArray[i - 1] ? searchArray[i - 1].toLowerCase() : '')
      ))
    }
  }
}, [inpValue, questions]);


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
    if (id === 'All') {
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
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='MainInput' placeholder={'Search'} onChange={updateInputValue}></input>
        </form>
          <div id='questionGroups'>
            <button className={groupDisplay == 'All' ? 'GroupsButtonFilled' : 'GroupsButton'} onClick={() => switchGroupDisplay('All')}>All</button>
             { Object.values(groups).flat().map( item =>
            <button className={groupDisplay == item.id ? 'GroupsButtonFilled' : 'GroupsButton'} key={item.id} onClick={() => switchGroupDisplay(item.id)}>{item.name}</button>
            )}
         </div>
         <div className='QuestionsDisplay'>
         {filtered.map( item =>
           <div key={item.id}>
             <h1 className='QuestionParagraph' onClick={() => changeDisplay(item.id)} id={item.id} key={item.title}>{item.title}</h1>
             {showAnswer == item.id ?
               <Animate to="1" from="0" attributeName="opacity">
                  <div className="AnswerDisplay" key={item.id} dangerouslySetInnerHTML={{__html: item.content}}></div>
               </Animate>
             : ''}
      </div>)}
     </div>
    </div>
  );
}

export default App;
