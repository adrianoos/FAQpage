import data from './components/data'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>FAQ Page</h1>
      <form>
        <input className='MainInput'></input>
        <button>search</button>
      </form>
     <div className='QuestionsDisplay'></div>
      <p>{data.questions.map( item => <p>{item.title}</p>)}</p>
    </div>
  );
}

export default App;
