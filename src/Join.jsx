import React, {useEffect, useRef} from 'react';
import {useNavigate } from 'react-router-dom';
const Join = () => {
    const room = useRef();
    useEffect(()=>{
      const inp = document.querySelector('#room');
      const myLabel = document.querySelector(".label").classList;
      inp.addEventListener('focusin',()=>{
        myLabel.remove('top-8','text-cyan-200','text-base');
        myLabel.add('top-0','text-green-600','text-xs');
      });
      inp.addEventListener('focusout',()=>{
          if(!room.current?.value){
            myLabel.remove('top-0','text-xs','text-base');
            myLabel.add('top-8','text-cyan-200');
          }
          else{
            myLabel.remove('top-8');
            myLabel.toggle('text-xs','text-green-600');
          }
      });
    },[room.current?.value]);
    const navigate = useNavigate();
    const LinkToVideo = ()=>{
      if(room.current.value)
        navigate(`/${room.current.value}`);
      else alert("Please Input a same personal's id to call with your friends");
    }
    return (
        <div className='h-[100vh] flex flex-col items-center'>
          <h1 className='font-extrabold text-indigo-600 text-xl text-center mt-[10vh]'>That easy way to communication with your friends</h1>
          <div className='relative top-[100px] flex flex-col md:w-[400px] w-[300px]'>
            <label htmlFor="room" className='label absolute text-base md:left-[40%] left-[35%] text-cyan-200 transition-all duration-300 top-8'>Room's Id</label>
            <input onKeyPress={(e)=>{if(e.key==="Enter") LinkToVideo()}} 
            ref={room} id='room' type="text"
            className='pt-8 pb-0 md:pl-[40%] pl-[35%] placeholder:text-sm outline-none text-sky-700 text-base bg-inherit border-b-[3px] border-sky-400'/>
            <button onClick={LinkToVideo} className='md:px-16 px-10 py-2 mt-5 rounded-md bg-sky-500 text-sm hover:bg-sky-400 transition-all shadow-md shadow-sky-700'>Join</button>
          </div>
        </div>
    );
}

export default Join;
