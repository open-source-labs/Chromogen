import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useState as hooksUseState } from '../../../package/hooks_generator/hooks_src/api/hooks-api'
import Gratitude from '../components/Gratitude';

const MainContainer: React.FC = () => {
  // function MainContainer (){
  // const [post, setPost] = hooksUseState<number[]>([0], "id");
  // const [post, setPost] = useState([]);

  const [count, setCount] = hooksUseState<number[]>([0], 'id');
  return (

  <div>
    <p>You clicked {count.length-1} times</p>
    <button onClick={() => {
      setCount([...count, count[count.length-1] + 1])
      console.log('Main container count array', count)
      }
    }>
      Click me
    </button>
  </div>

  //  <Gratitude />
  )
}

export default MainContainer;