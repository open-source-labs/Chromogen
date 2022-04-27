import { useState as hooksUseState } from '../../../package/hooks_generator/hooks_src/api/hooks-api'

const MainContainer: React.FC = () => {

  const [subtract, setSubtract] = hooksUseState<number>(0, 'subtract');
  const [add, setAdd] = hooksUseState<number>(0, 'add');

  return (

  <div className='main'>
    <header>
      <h1 className='scoreH1'>Score Card</h1>
    </header>
    <div className='buttonBox'>
    <div className='buttonDiv' id="add">
      <p><span className="num">{add}</span></p>
      <button className="mainButton" onClick = {() => setAdd(add + 1)}>Add One</button>        
    </div>
    <div className='buttonDiv' id="subtract">
      <p><span className="num"> {subtract}</span></p>
      <button className="mainButton" onClick = {() => setSubtract(subtract - 1)}>Subtract One</button>
    </div>
    </div>
  </div>
  )
}

export default MainContainer;