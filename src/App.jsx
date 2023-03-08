import React from 'react';
import {Routes,Route} from "react-router-dom";
import Join from './Join';
import VideoCall from './videoCall';
const App = () => {
  return (
    <div className='h-[100vh] lg:w-[80%] w-[90%] mx-auto'>
        <Routes>
          <Route path='/' element={<Join/>} />
          <Route path='/:room' element={<VideoCall/>} />
        </Routes>
    </div>
  );
}

export default App;
