import React from 'react';
import { useParams } from 'react-router-dom';
import {io} from "socket.io-client";
import { Peer } from "peerjs";
import {SlScreenDesktop} from "react-icons/sl";
import {MdOutlineFlipCameraIos} from "react-icons/md";
import {AiFillVideoCamera} from "react-icons/ai";
const Chat = () => {
    const {room} = useParams();
    const peer = new Peer();
    const peers = {};
    const socket = io("https://video-call-ob4g.onrender.com");
    var videoUnique = [];
    var i=0;
    peer.on("open",async(id)=>{
        await openCamera().then(()=>{
            window.id = id;
            socket.emit("join",{room,id});
        })
    });
    const screenShare = async()=>{
        await navigator.mediaDevices.getDisplayMedia({audio:false})
        .then(ownStream=>{
            shareCloser();
            document.querySelector("#ownStream").srcObject = ownStream;
            window.localStream = ownStream;
        })
    }
    const openCameraOnPhone = async()=>{
        let cameraType = "environment";
        if(i%2)  cameraType = "user";
        await navigator.mediaDevices.getUserMedia({video:{facingMode:cameraType,},audio:true})
        .then(ownStream=>{
            shareCloser();
            document.querySelector("#ownStream").srcObject = ownStream;
            window.localStream = ownStream;
            i++;
        });
    }
    const openCamera = async()=>{
        await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",},audio:true})
        .then(ownStream=>{
            shareCloser();
            document.querySelector("#ownStream").srcObject = ownStream;
            window.localStream = ownStream;
        });
    }
    const shareCloser = ()=>{
        const stream = document.querySelector("#ownStream").srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(function (track) {
            track.stop();
          });
          document.querySelector("#ownStream").srcObject = null;
       }
    }
    peer.on("call",call=>{
        call.answer(window.localStream);
        call.on("stream",friendStream =>{
            if(!videoUnique.includes(friendStream.id)){
                const video = document.createElement("video");
                video.setAttribute("id","friendStream");
                document.querySelector("#friStreamCover").classList.replace("hidden","grid");
                addStream(friendStream,video);
                videoUnique.push(friendStream.id);
            }
        })
    })
    socket.on("user-joined",({id})=>{
        callToNewFriend(id,window.localStream);
        pushNotification();
    });
    socket.on("friend-screen",(id)=>{
        friendChangeStream(window.localStream,id);
    })
    socket.on("user-disconnect",({id})=>{
        if(peers[id]) peers[id].close();
        document.querySelector("#friStreamCover").classList.replace("grid","hidden");
        document.querySelector("#friendStream").remove();
    });
    const pushNotification = ()=>{
        const show = new Notification("Hello Guy!",{
            body:"Your friends was joined",
            icon:"./Logo.jpg"
        })
        setTimeout(()=>{show.close();},5000);
    };
    const addStream = (stream,video)=>{
        const friStreamCover = document.querySelector("#friStreamCover");
        friStreamCover.classList.replace("hidden","grid");
        video.classList.add("lg:w-[450px]","h-[360px]","rounded-lg");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata",()=>{
            video.play();
        })
        friStreamCover.append(video);
    };
    const friendChangeStream = (stream,id)=>{
        const call = peer.call(id,stream);
        call.on("stream",friendStream=>{
            if(!videoUnique.includes(friendStream.id)){
                const friendVideo = document.querySelector("#friendStream");
                friendVideo.srcObject = friendStream;
                friendVideo.addEventListener("loadedmetadata",()=>{
                    friendVideo.play();
                })
                videoUnique.push(friendStream.id);
            }
            peers[id] = call;
        })
    }
    const callToNewFriend = (id,stream)=>{
        const call = peer.call(id,stream);
        call.on("stream",friendStream =>{
            if(!videoUnique.includes(friendStream.id)){
                const friendVideo = document.createElement("video");
                friendVideo.setAttribute("id","friendStream");
                addStream(friendStream,friendVideo);
                videoUnique.push(friendStream.id);
            }
        })
        peers[id] = call;
    }
    const changeToScreen = async()=>{
        await screenShare().then(()=>{
            socket.emit("change-screen",window.id);
        })
    }
    const changeToPhoneCamera =async ()=>{
        await openCameraOnPhone().then(()=>{
            socket.emit("change-screen",window.id);
        })
    }
    const changeToCamera = async()=>{
        await openCamera().then(()=>{
            socket.emit("change-screen",window.id);
        })
    }
    return (
        <div className='w-full lg:px-0 px-[20px]'>
            <span className='flex justify-center items-center mt-10 md:text-4xl text-2xl font-extrabold'>Videos Calling</span>
            <div id='video-grid' className='mt-[10vh] flex justify-center items-center md:gap-10 gap-5 md:flex-row flex-col'>
                <div className='relative z-0 lg:w-[450px] lg:h-[350px] w-full h-auto bg-sky-300 rounded-lg grid place-content-center p-2 mx-10'>
                    <video className='rounded-lg w-full h-full'
                     muted  id="ownStream" autoPlay></video>
                    <div className='absolute bottom-5 left-[40%] flex justify-center items-center gap-5'>
                        <button>
                            <AiFillVideoCamera onClick={changeToCamera} fill='gray' size="30px" className='sm:block hidden'/>
                            <MdOutlineFlipCameraIos onClick={changeToPhoneCamera} fill='gray' size="30px" className='sm:hidden block'/>
                        </button>
                        <button className='sm:block hidden'>
                            <SlScreenDesktop onClick={changeToScreen} fill='gray' size="30px"/>
                        </button>
                    </div>
                </div>
                <div id='friStreamCover' className='relative z-0 lg:w-[450px] lg:h-[350px] w-full h-auto bg-sky-300 rounded-lg hidden place-content-center p-2 mx-10'>
                    
                </div>
            </div>
        </div>
    );
}

export default Chat;