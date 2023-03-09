import React from 'react';
import {Routes,Route} from "react-router-dom";
import Join from './Join';
import VideoCall from './videoCall';
const App = () => {
  return (
    <div className='h-[100vh] lg:w-[80%] w-[100%] mx-auto overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Join/>} />
          <Route path='/:room' element={<VideoCall/>} />
        </Routes>
    </div>
  );
}

export default App;
