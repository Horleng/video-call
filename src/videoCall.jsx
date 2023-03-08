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
    const socket = io("ws://localhost:5000");
    peer.on("open",id=>{
        alert(id);
        socket.emit("join",{room,id});
    })
    navigator.mediaDevices.getUserMedia({video: true,audio:true})
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
        <div className='mt-[10vh] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            <video className='rounded-lg' ref={myVideoRef} muted autoPlay></video>
            <video ref={friVideoRef} muted autoPlay></video>
        </div>
    );
}

export default Chat;
