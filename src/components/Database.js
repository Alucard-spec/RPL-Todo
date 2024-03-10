import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { db } from '../firebase'; 
import { getDocs,collection ,addDoc} from 'firebase/firestore';
import { auth } from '../firebase';
import { onAuthStateChanged ,signOut} from 'firebase/auth';
import Missions from './Missions';
const Database = () => {
  const navigate= useNavigate()
  const SignOut=async ()=>{
    await signOut(auth);
    setTodo();
  }

  const [todo,setTodo]= useState();



  const getTodos = async ()=>{
    try{
  const data = await getDocs(todoCollection);
  const filteredData= data.docs.map((doc)=> ({...doc.data(),id:doc.id}));
    setTodo(filteredData.filter(todo=>{
      return todo.userID===user?.uid;
    }));
      
  
      
}
  catch(err){
    console.error(err);
  }}
    const [user,setUser]= useState();
   useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setUser(user);
            getTodos();
            
        }
        else{
          navigate("/");
        }
        
        
   })
   },[user])

   

  const todoCollection= collection(db,"Tasks");
  const [isOpen,setIsOpen]= useState(false);

  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [difficulty,setDifficulty]= useState("");
  const [dueDate,setDueDate]= useState("");

  const submitTodo = async ()=>{
    try{
    await addDoc(todoCollection,{title:title,Description:description,Difficulty:difficulty,DueDate:dueDate,userID:user?.uid});
    getTodos();

  }
    catch(err){
      console.error(err);
    }
  }
  return (
    <div >

<div className=' text-white p-5'>

    
  <div className='flex flex-col-reverse gap-10'>



  <div className={isOpen?'text-black text-lg flex flex-col gap-6 max-w-[700px] transition-all md:px-6 ':'hidden'}>
        <input className='p-1 md:p-2' type="text" placeholder='Title' onChange={(e)=> setTitle(e.target.value)} />
        <textarea onChange={(e)=> setDescription(e.target.value)} className='p-1 md:p-2' rows={4} ></textarea>
        
       
       <input type="date" onChange={(e)=> setDueDate(e.target.value)}/>
       <select onChange={(e)=> setDifficulty(e.target.value)} className='font-semibold '>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
  
</select>
       <button onClick={submitTodo} className=' border-white border p-1 md:p-2 text-white font-serif'>Submit</button>

       

       </div>
       <div onClick={()=>setIsOpen(!isOpen)} className={isOpen?"cursor-pointer border-white w-fit p-1 rounded-3xl border-2 rotate-45 transition-all":"cursor-pointer border-white w-fit p-1 rounded-3xl border-2 transition-all "}> 

<FaPlus size={30} color="red"/>
</div>
       
       <div className='flex justify-between md:text-2xl'>
       <div>points</div>
       <button onClick={SignOut} className='border-white border p-1 rounded-lg font-serif'> Sign Out</button></div>
      
       
       </div>

       
        
      
       <br /><br /><br />
       <div className='space-y-8'>
        {todo?.map((todo)=>(
          <div className='  text-center md:text-left rounded-lg mx-6 break-words sm:mx-8  max-w-4xl text-black'>
            
            <Missions todo={todo} getTasks={getTodos} />
          {console.log(todo)}
          
          </div>

        ))}
      </div>
      </div>
    </div>
  )
}

export default Database