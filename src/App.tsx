import { useState } from 'react'
import AddModal from './AddModal'
import './App.css'

const App = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  return (
    <>
      <button type={'button'} onClick={() => setIsAddOpen(true)}>Click Me</button>
      <AddModal isOpen={isAddOpen} setOpen={setIsAddOpen}>Hellooo</AddModal>
    </>
  )
}

export default App
