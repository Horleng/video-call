import React, {useState} from 'react';
import { Link } from 'react-router-dom';
const Join = () => {
    const [room,setRoom] = useState("");
    return (
        <div className='h-[100vh] flex flex-col items-center'>
          <h1 className='font-extrabold text-indigo-600 text-xl text-center mt-[10vh]'>That easy way to communication with your friends</h1>
          <span className='mt-20'>
            <input value={room} onChange={(e)=>setRoom(e.target.value)} type="text" placeholder="Enter group's Room to join" className='py-3 px-6 placeholder:text-sm outline-none rounded-l-lg text-gray-400'/>
            <Link to={"/"+room}>
              <button className='px-6 py-3 rounded-r-lg bg-sky-500 hover:bg-sky-400 transition-all shadow-md shadow-sky-400'>Join</button>
            </Link>
          </span>
        </div>
    );
}

export default Join;
