import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const Join = () => {
    const [room,setRoom] = useState("");
    useEffect(()=>{
      const inp = document.querySelector('#room');
      inp.addEventListener('focusin',()=>{
        document.querySelector(".label").classList.toggle('top-8');
        document.querySelector(".label").classList.add('text-[10px]','top-0');
      });
      inp.addEventListener('focusout',()=>{
          if(!room){
            document.querySelector(".label").classList.remove('top-0','text-[10px]');
            document.querySelector(".label").classList.add('top-8');
          }
          else{
            document.querySelector(".label").classList.remove('top-8');
            document.querySelector(".label").classList.add('text-[10px]');
          }
      });
    },[room]);
    return (
        <div className='h-[100vh] flex flex-col items-center'>
          <h1 className='font-extrabold text-indigo-600 text-xl text-center mt-[10vh]'>That easy way to communication with your friends</h1>
          <div className='relative top-[100px] flex flex-col md:w-[400px] w-[300px]'>
            <label htmlFor="room" className='label absolute text-base md:left-[40%] left-[35%] text-cyan-200 transition-all duration-200 top-8'>Group's name</label>
            <input value={room} id='room' onChange={(e)=>setRoom(e.target.value)} type="text"
            className='pt-8 pb-0 md:pl-[40%] pl-[35%] placeholder:text-sm outline-none text-sky-700 text-base bg-inherit border-b-[3px] border-sky-400'/>
          <Link to={"/"+room} className='mx-auto'>
            <button className='md:px-16 px-10 py-2 mt-5 rounded-md bg-sky-500 text-sm hover:bg-sky-400 transition-all shadow-md shadow-sky-700'>Join</button>
          </Link> 
          </div>
        </div>
    );
}

export default Join;
