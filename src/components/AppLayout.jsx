
import { useState } from 'react'
import { FaBars} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const AppLayout = ({children}) =>{
    const [open, setOpen] = useState(false)

    const handleToggle = () => setOpen(prevState => !prevState)

    return (
        <div className="bg-slate-800 w-full min-h-screen text-white">
            {/* Navigation */}
            <div className="flex flex-col md:flex-row  py-4 px-4 md:px-8 items-center ">
                <nav className="flex flex-grow w-full md:w-1/12 items-center justify-between py-4 md:py-0">
                    <a href="#" className='text-2xl px-2'>My Apps</a>
                    <button className="block md:hidden text-white p-4" onClick={handleToggle}><FaBars className={`${open ? 'transition rotate-90 ease-linear ' : ' transition rotate-0 ease-linear'}`}/></button>
                </nav>
                <div className={`${open ? 'flex' : 'hidden md:flex'} flex-col md:flex-row justify-between w-full`}>
                    <nav className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                        <Link to='/collections' className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Collections</Link>
                        <a href="#" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Sale</a>
                    </nav>
                    <nav className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                        <Link to="/login" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Login</Link>
                        <Link to="/signup" className='p-2 min-w-full md:min-w-[8rem] text-start md:text-center hover:bg-red-500'>Register</Link>
                    </nav>
                </div>
            </div>
            <>
            {children}
            </>
        </div>
    )
}

export default AppLayout