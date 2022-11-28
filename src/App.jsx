import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import { RequiredAuth } from './contexts/AuthContext'
import Quiz from './pages/quiz'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={
          <RequiredAuth>
            <Quiz />
          </RequiredAuth>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
