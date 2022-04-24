import React, { useEffect } from 'react';
import { useState as hooksUseState } from '../../../package/hooks_generator/hooks_src/api/hooks-api'

const MainContainer: React.FC = () => {

  const [subtract, setSubtract] = hooksUseState<number>(0, 'subtract');
  const [count, setCount] = hooksUseState<number[]>([0], 'count');

  return (

  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => {
        setCount([count[0] + 1])
      }
    }>
    Count
    </button>

     <p>You subtracted {subtract} times</p>
      <button onClick={() => {
        setSubtract(subtract - 1)
      }
    }>Subtract</button> 

      <p>You did not </p>
      <button onClick={() => {      
      }}>
        Don't click me
      </button>
  </div>
  )
}

export default MainContainer;