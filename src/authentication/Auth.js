import React, { useState } from 'react'
import { auth } from '../firebase';
import {useNavigate} from 'react-router-dom';

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
const Auth = () => {
  const navigate= useNavigate()



   onAuthStateChanged(auth,(user)=>{
        if(user){
            
            navigate("/data");
            
        }
        
   })
    

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const signIn=async ()=>{
        
            await createUserWithEmailAndPassword(auth,email,password);
            
        
    }
   
    const LogIn=async ()=>{
        await signInWithEmailAndPassword(auth,email,password);
        
 
    }
    

  return (
    <div className=' bg-black text-white'>
      <div className='text-3xl md:text-4xl lg:text-5xl text-red-600 font-extrabold w-fit mx-auto pt-5'>R<span className='text-sm text-white'>ole</span> P<span className='text-sm text-white'>laying</span> L<span className='text-sm text-white'>ife</span> </div>
    <div  className="min-h-screen flex flex-col gap-5 items-center justify-center lg:flex-row">

<div className="max-w-md w-full p-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
      
          <div className="mb-4">
            <label  className="block text-white">
              Email
            </label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
              placeholder="Enter your email"
             
            />
          </div>
          <div className="mb-4">
            <label  className="block text-white">
              Password
            </label>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}           
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
              placeholder="Enter your password"
             
              
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F9DF74] text-black font-bold py-2 rounded-md hover:text-white hover:bg-transparent" onClick={LogIn} 
          >
            Log In
          </button>
        
      </div>
      <div>OR</div>
      <div className="max-w-md w-full p-6  text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
      
          <div className="mb-4">
            <label  className="block text-white">
              Email
            </label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
              placeholder="Enter your email"
             
            />
          </div>
          <div className="mb-4">
            <label  className="block text-white">
              Password
            </label>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}           
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
              placeholder="Create your password"
             
              
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F9DF74] text-black font-bold py-2 rounded-md hover:text-white hover:bg-transparent" onClick={signIn} 
          >
            Register
          </button>
        
      </div>

               

            

    </div>
    </div>
  )
}

export default Auth

