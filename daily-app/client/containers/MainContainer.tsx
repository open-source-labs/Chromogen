import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useState as hooksUseState } from '../../../package/hooks_generator/hooks_src/api/hooks-api'
// import Gratitude from '../components/Gratitude';

const MainContainer: React.FC = () => {
  // function MainContainer (){
  // const [post, setPost] = hooksUseState<number[]>([0], "id");
  // console.log('in maincontainer???????')
  // const [post, setPost] = useState([]);
  const [count, setCount] = hooksUseState<number[]>([0], 'Main Container\'s count');
  const [subtract, setSubtract] = hooksUseState<number[]>([0], 'Main Container');

  return (

  <div>
    <p>You clicked {count[count.length-1]} times</p>
    <button onClick={() => {
        // setCount([count[0]+1])
        setCount([...count, count[count.length - 1] + 1]);
      }
    }>
      Click me
      </button>
      <p>You did not </p>
      <button onClick={() => {
      
      }}>
        Don't click me
      </button>
  </div>

  //  <Gratitude />
  )
}

export default MainContainer;