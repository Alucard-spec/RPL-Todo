import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { db } from '../firebase'; 

import { getDocs,collection ,addDoc,updateDoc,doc} from 'firebase/firestore';
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
            getPoints();
            
        }
        else{
          navigate("/");
        }
        
        
   })
   },[user])

   

  const todoCollection= collection(db,"Tasks");




//!Points counting logic
   const points= collection(db,"points");

   const [userPoints,setUserPoints]=useState();

   const getPoints= async ()=>{
      try{
          const allPoints= await getDocs(points);
          const filteredPoints= allPoints.docs.map((doc)=> ({...doc.data(),id:doc.id}));
          const user_points= filteredPoints.filter(point=>{
            return point.userID===user?.uid;
          })
          if(user_points.length===0){
            
            pointIntializer();
            getPoints();
            
          }
          setUserPoints(user_points[0]);
          

      }
      catch (err){
        console.error(err);
      }
   }

   const pointIntializer=async ()=>{
    try{
      if(user){
         await addDoc(points,{points:0,userID:user?.uid});
         
      }}
    catch(err){
        console.error(err);
    }
    
   
   }
   
   

   

  const [isOpen,setIsOpen]= useState(false);

  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [difficulty,setDifficulty]= useState("");
  const [dueDate,setDueDate]= useState("");

  const submitTodo = async ()=>{
    try{
    setIsOpen(false);
    await addDoc(todoCollection,{title:title,Description:description,Difficulty:difficulty,DueDate:dueDate,userID:user?.uid});
    getTodos();

  }
    catch(err){
      console.error(err);
    }
  }

const updatePoints=async (difficulty) => {
  await getPoints();
  if(userPoints){
  const id=userPoints?.id;
  const points=userPoints?.points;
  const pointDoc= doc(db,"points",id);
  const pointIncreasor=difficulty==="easy"?2:difficulty==="medium"?3:5;
  await updateDoc(pointDoc,{
    points:points+pointIncreasor
  })
  getPoints();
}}



  return (
    <div >
      <div className="mx-auto mt-5 w-fit md:text-2xl text-xl cursor-default font-serif font-extrabold space-x-2">
      <span className="text-2xl text-red-500 md:text-4xl">R</span>ole <span className="text-2xl text-red-500 md:text-4xl">P</span>laying <span className="text-2xl md:text-4xl text-red-500">L</span>ife
      </div>

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
       <div className="font-serif font-semibold tracking-wide cursor-default">{userPoints?userPoints?.points===0?( <div >Novice </div> ):userPoints?.points<100?( <div className="text-green-500"> Beginner</div> ):userPoints?.points<1000? (<div className="text-yellow-500"> Intermediate</div> ):( <div className="text-red-500">Master</div> ):""}</div>
       <button onClick={SignOut} className='border-white border p-1 rounded-lg font-serif hover:bg-white hover:text-black hover:scale-105 transition-all'> Sign Out</button></div>
      
       
       </div>

       
        
      
       <br /><br /><br />
       <div className='space-y-8'>    {todo?.length!==0?todo?.map((todo)=>(
          <div key={todo.id} className='  text-center md:text-left rounded-lg mx-6 break-words sm:mx-8  max-w-4xl text-black'>
            
            <Missions todo={todo} getTasks={getTodos} key={todo.id} updateP={updatePoints}  />
          {console.log(todo)}
          
          </div>

        )):( <div className=" text-2xl md:text-3xl w-fit mx-auto italic font-serif font-bold text-red-500 cursor-default"> Such Empty !!</div> )}
      </div>
      </div>
    </div>
  )
}

export default Database