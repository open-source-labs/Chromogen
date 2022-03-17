import React , { useState, useEffect }from "react";
import { render } from "react-dom";
import Goals from './Goals.jsx';

const useInput = init => {
    const [value, setValue] = useState(init); 
    const onChange = e => {
        setValue(e.target.value);
    };
    return [ value, onChange ];
}

const Gratitude = props => {
  const [ answer, answerOnChange] = useInput('');
  const [ arrays, setArrays ] = useState([]);

const saveAnswer = () => {
    const body = {
        answer
    };

    fetch('http://localhost:3000/', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(body),
    })
     .then(response => response.json())
     .then(data => { setArrays(oldArray => [...oldArray, data.answer]) })
     .catch(err => console.log('CreateCharacter fetch /: ERROR: ', err));

}

  return(
    <div>
      <h2>What am I grateful for today?</h2>
      <textarea name="answer" placeholder="enter..." value={answer} onChange ={answerOnChange} />
      
      <button type="button" className="btnMain" onClick={saveAnswer}>Save</button>
      <div id='testing'>
      <Goals blog = {arrays}/>
      </div>
    </div>
  )
}

export default Gratitude;