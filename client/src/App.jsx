import React from 'react'
import {Route, Routes} from "react-router-dom"
import UserData from './UserData'
import UserLog from './UserLog'

const App = () => {
  return (
    <>
    <Routes>
      <Route element={<UserData/>} path='/'></Route>
      <Route element={<UserLog/>} path='/userlog'></Route>
    </Routes>
   </>
  )
}

export default App;