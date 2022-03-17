import React , { useState, useEffect } from "react";


const Goals = props => {
  const allEntries = props.blog //added this
//console.log(allEntries)
  const [ all, setAll] = useState([])

  let index = 0;

  const deleteAnswer = (i) => {
    //i want to send a post request to whatever answer user deletes 
    //also delete from allEntries array
    setAll(oldArray => [all.splice(i,1)])
    console.log(all)
    //return (allEntries.splice(i,1))

  }


  return (
    allEntries.map((element, index)=> <div key = {index++} className="goals">
      {element}

      <button type="button" className="btnMain" onClick={() => deleteAnswer(index - 1)}>X</button>
     
    </div>)
  )
}

export default Goals