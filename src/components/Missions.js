import { RiDeleteBinFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";

import React from 'react'
import { db } from '../firebase'; 
import { deleteDoc,doc} from 'firebase/firestore';

const Missions = ({todo,getTasks,updateP}) => {

  const deleteTask = async (id) => {
    const taskDoc= doc(db,"Tasks",id);
    await deleteDoc(taskDoc);
    getTasks();
    
  }
  
 
 

  return (
    <div className={todo.Difficulty==='hard'?'bg-red-500 p-5 border border-black rounded-lg ':todo.Difficulty==='medium'?'bg-yellow-400 p-5 border border-black rounded-lg ':'bg-green-400 p-5 border border-black rounded-lg '} > 
      <div className='md:flex md:justify-between md:space-y-0 '>
    <div className="md:space-y-6 space-y-4">
        <div className='text-2xl font-mono md:text-4xl font-bold underline'>
            {todo.title}
        </div>
       
        <div className='text-xl md:text-2xl font-mono'>
            {todo.Description}
        </div>
        
        <div className='text-lg md:text-xl font-medium italic'>
            {todo.DueDate}
            
        </div>
       
        </div>
        <div className='flex  justify-evenly md:justify-between md:flex-col'>
        
        <button >
      <MdDone size={30} onClick={ async ()=> {
        
        
       await updateP(todo.Difficulty);
      deleteTask(todo.id)}}/>
        </button>
        <button  onClick={()=>deleteTask(todo.id)}>
          <RiDeleteBinFill size={30}/>
          </button> </div>
        </div>
       



    </div>
  )
}

export default Missions