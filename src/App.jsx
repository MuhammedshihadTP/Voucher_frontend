
import './App.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router'
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <>
  <div className="App">
      
      <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App
