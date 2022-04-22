import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useState as hooksUseState } from '../../../package/hooks_generator/hooks_src/api/hooks-api'
// import Gratitude from '../components/Gratitude';

const MainContainer: React.FC = () => {
  // function MainContainer (){
  // const [post, setPost] = hooksUseState<number[]>([0], "id");
  // const [post, setPost] = useState();

  const [subtract, setSubtract] = hooksUseState<number>(0, 'subtract');
  const [count, setCount] = hooksUseState<number[]>([0], 'count');
  return (

  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => {
        setCount([count[0]+1])
      //setCount([...count, count[count.length-1]+1])
      console.log('count after setCount', count)
      }
    }>
    Count
    </button>

     <p>You subtracted {subtract} times</p>
      <button onClick={() => {
        setSubtract(subtract - 1)
      //setCount([...count, count[count.length-1]+1])
      //console.log('count after setCount', count)
      }
    }>Subtract</button> 

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