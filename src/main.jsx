import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom' 
import './index.css'
import Error404page from './pages/Error404page'
// pages
import Login from './pages/Login'
import Signup from './pages/Signup'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/login' element={< Login />}></Route>
    <Route path='/signup' element={< Signup />}></Route>
      {/* <Route path='' element={< Home/>} />
      <Route path='app' element={<App/>}/>
      <Route path='about' element={< About />} />
      <Route path='contact' element={< Contact />} />
      <Route path='user/' element={<User/>}>
        <Route path=':userid' element={<User/>}/>
      </Route>
      <Route path='github' element={< Github/>} /> */}

      <Route path='*' element={<Error404page/>}></Route>
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
