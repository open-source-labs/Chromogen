import React, {useState, useEffect} from 'react';
import Gratitude from '../components/Gratitude.jsx';

function MainContainer (){
  const [post, setPost] = useState([]);
  
 // useEffect(() => 
 
    // fetch('/')
    // .then(data => data.json())
    // .then(data => console.log(data))


  //)

  return (
     <Gratitude />
  )
}

export default MainContainer;