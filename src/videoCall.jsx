import React, {useRef } from 'react';
import { useParams } from 'react-router-dom';
import {io} from "socket.io-client";
import { Peer } from "peerjs";
const Chat = () => {
    const {room} = useParams();
    const myVideoRef = useRef();
    const friVideoRef = useRef();
    const peers = {};
    const peer = new Peer();
    const socket = io("https://video-call-ob4g.onrender.com");
    peer.on("open",id=>{
        socket.emit("join",{room,id});
    })
    navigator.mediaDevices.getUserMedia({video: true,audio:true,facingMode: 'environment'})
    .then(ownVideo=>{
        myVideoRef.current.srcObject = ownVideo;
        peer.on("call",call=>{
            call.answer(ownVideo);
            call.on("stream",friVideo =>{
                friVideoRef.current.srcObject = friVideo;
            })
        })
        socket.on("user-joined",({id})=>{
            const call = peer.call(id,ownVideo);
            call.on('stream',friVideo=>{
                friVideoRef.current.srcObject = friVideo;
            })
            peers[id] = call;
        });
        socket.on("user-disconnect",({id})=>{
            if(peers[id]) peers[id].close();
        })
    })
    return (
        <div className='w-full lg:px-0 px-[20px]'>
            <span className='flex justify-center items-center mt-10 md:text-4xl text-2xl font-extrabold'>Videos Calling</span>
            <div className='mt-[10vh] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                <video className='rounded-lg md:w-[500px] md:h-[500px] sm:w-[300px] sm:h-[300px] w-[100%] h-[300px]' muted  ref={myVideoRef} autoPlay></video>
                <video className='rounded-lg md:w-[500px] md:h-[500px] sm:w-[300px] sm:h-[300px]  w-[100%] h-[300px]' ref={friVideoRef} autoPlay></video>
            </div>
        </div>
    );
}

export default Chat;
