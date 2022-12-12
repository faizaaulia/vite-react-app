import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import AuthProvider from './contexts/AuthContext'
import Quiz from './pages/quiz'
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from './pages/register'
import History from './pages/quiz/history'
import QuizDetail from './pages/quiz/detail'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path='/'
          element={
            <AuthProvider>
              <Home />
            </AuthProvider>
          }
        />
        <Route
          path='/quiz'
          element={
            <AuthProvider>
              <Quiz />
            </AuthProvider>
          }
        />
        <Route
          path='/quiz/history'
          element={
            <AuthProvider>
              <History />
            </AuthProvider>
          }
        />
        <Route
          path='/quiz/:id'
          element={
            <AuthProvider>
              <QuizDetail />
            </AuthProvider>
          }
        />
        <Route
          path='/login'
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path='/signup'
          element={
            <AuthProvider>
              <Register />
            </AuthProvider>
          }
        />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
