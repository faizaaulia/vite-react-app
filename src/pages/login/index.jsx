import React from "react"
import AppLayout from "../../components/AppLayout"
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import supabase from '../../configs/supabase'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const schema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
})


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const authContext = useContext(AuthContext);
  
  const onSubmit = async (value) => {
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: value.email,
      password: value.password
    });

    if (data.user) {
      authContext.setAuthUser({
        email: data.user.email,
        id: data.user.id,
        isLogin: true
      });
    }

    if (error) {
      alert(`Gagal. ${error.message}`)
    }
  };

  if (authContext.user.isLogin) {
    return (
      <Navigate to='/' />
    )
  }

  return(
    <AppLayout>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h1 className="text-4xl mb-4 font-bold">Login</h1>
        <form className="bg-slate-600 w-1/2 md:w-1/3 flex flex-col p-12 rounded space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full ">
            <label htmlFor="email">Email</label>
            <div className="mt-2">
              <input {...register('email')}  type="text" id="email" className="w-full p-2 outline-none focus:ring ring-offset-2 text-gray-800 rounded" placeholder="Ex: contoh@email.com"/>
            </div>
            {errors.email && <span className="text-rose-500 text-xs font-bold mt-1">{errors.email.message?.toString()}</span>}
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="password">Password</label>
            <div className="mt-2">
              <input {...register('password')} type="password"  id="password" className="w-full p-2 outline-none focus:ring ring-offset-2 text-gray-800 rounded" placeholder="masukan password anda"/>
            </div>
            {errors.password && <span className="text-rose-500 text-xs font-bold mt-1">{errors.password.message?.toString()}</span>}
          </div>
          <button type="submit" className="w-full p-2 bg-slate-800">Login</button>
        </form>
      </div>
    </AppLayout>
  )
}

export default Login