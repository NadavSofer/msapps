import React from 'react'
import Test from './Components/Test';
import Button from './Components/Button';


const App = () => {
  return (
    <div className='bg-indigo-950 w-full h-full'>
      <Test></Test>
      <Button text='hello'></Button>
    </div>
  )
}

export default App