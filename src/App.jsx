import { useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from "react-router-dom"
import AllContenders from './components/contendants'
import AllFilteredPosts from './components/datesAvailble'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<AllContenders />}></Route>
      <Route path='/findHist' element={<AllFilteredPosts />}></Route>
    </Routes>
    </>
  )
}

export default App
