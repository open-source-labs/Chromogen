import React, {useState} from 'react';
import Gratitude from '../components/Gratitude.jsx';

function MainContainer (){
  const [post, setPost] = useState([]);
  
//   fetch('http://localhost:3000/', {
//     method: 'GET', 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//  .then(response => response.json())
//  .then(data => console.log(data.answer))

    // .catch(() => {
    //   console.log('there was an error')
    // }
    // )
  


  return (
     <Gratitude />
  )
}

export default MainContainer;