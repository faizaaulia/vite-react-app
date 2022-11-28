import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import { RequiredAuth } from './contexts/AuthContext'
import Quiz from './pages/quiz'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/quiz' element={
        <RequiredAuth>
          <Quiz />
        </RequiredAuth>
      } />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
