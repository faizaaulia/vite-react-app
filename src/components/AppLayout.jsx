
import { useContext } from 'react'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import supabase from '../configs/supabase'
import AuthProvider, { AuthContext } from '../contexts/AuthContext'

const AppLayout = ({children}) =>{
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(prevState => !prevState)
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    if (confirm('Logout?')) {
      await supabase.auth.signOut();
      authContext.setAuthUser({
        email: null,
        id: null,
        isLogin: false
      });
    }
  }

  return (
    <AuthProvider>
      <div className="bg-slate-800 w-full min-h-screen text-white">
        {/* Navigation */}
        <div className="flex flex-col md:flex-row  py-4 px-4 md:px-8 items-center">
          <nav className="flex flex-grow w-full md:w-1/6 items-center justify-between py-4 md:py-0">
            <Link to='/' className='text-2xl px-2'>My Apps</Link>
            <button className="block md:hidden text-white p-4" onClick={handleToggle}><FaBars className={`${open ? 'transition rotate-90 ease-linear ' : ' transition rotate-0 ease-linear'}`}/></button>
          </nav>
          <div className={`${open ? 'flex' : 'hidden md:flex'} flex-col md:flex-row justify-between w-full`}>
            {authContext.user.isLogin ? (
              <>
                <nav className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                  <Link to="/quiz" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Quiz</Link>
                  <Link to="/quiz/history" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>History</Link>
                </nav>
                <div className='flex flex-row-reverse md:flex-row justify-between space-x-0 md:space-x-4'>
                  <span className='p-2'>{authContext.user.email}</span>
                  <button
                    onClick={handleLogout}
                    className='p-2 hover:bg-red-500'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <nav className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full justify-end">
                <Link to="/login" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Login</Link>
                <Link to="/signup" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Register</Link>
              </nav>
            )}
          </div>
        </div>
        <>
          {children}
        </>
      </div>
    </AuthProvider>
  )
}

export default AppLayout