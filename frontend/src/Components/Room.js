import React from "react";
import { withRouter } from "react-router-dom";
import {io} from "socket.io-client";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import styles from './Room.module.css'
let socket = io.connect("http://localhost:5000");

function Room(props){

    let [roomMembers, setRoomMembers] = useState([]);

    let [currentUser, setCurrentUser] = useState("");

    let [roomIcon , setRoomIcon] = useState("");
    
    let [roomName, setRoomName] = useState("");

 

   
  
    useEffect(()=>{

        
       
        let getRoomData = async()=>{

            //console.log(props.match);
            let response = await fetch('/api/room/'+props.match.params.roomname);
            let json = await response.json();

            if(response.ok){
                    
                setRoomMembers(json.members);
                setCurrentUser(json.currentUser);
                setRoomIcon(json.serverIcon);
                setRoomName(json.serverName);
                

            }

           
        
          
        }

        getRoomData();

        socket.on('userMsg', function(arg){
               
            document.getElementById('chat-container').innerHTML +="<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black'><h4>"+arg.username+"</h4><p>"+arg.data+"</p></div>"
            document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        })

        socket.on('emitedImg', function(arg){
           
            document.getElementById('chat-container').innerHTML +="<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black'><h4>"+arg.username+`</h4><img width = "500" src = ${arg.data}></div>`
             document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        })
        socket.on('emitedAudio', function(arg){
           
            document.getElementById('chat-container').innerHTML +=`<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black'><h4>${arg.username}</h4><audio controls><source src="${arg.data}"></audio></div>`
             document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        })
        socket.on('emitedVideo', function(arg){
           
            document.getElementById('chat-container').innerHTML +=`<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black'><h4>${arg.username}</h4><video width = "500" controls><source src="${arg.data}"></video></div>`
             document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        })

    
      

        return () => {
            socket.off("userMsg");
            socket.off("emitedImg");
            socket.off("emitedAudio");
            socket.off("emitedVideo");
            
          };

        

       

      
    }, [],[])


    let membersChatContainer = {
        display: 'flex',
        flexDirection: 'column',
        
        marginTop: '5%'

    }

    let memebersStyle = {
        background: 'white',
        display:'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        whiteSpace: 'nowrap'
    }

    let chatAreaStyle = {
        background: 'white'
    }
    let chatcontainer = {
        height: '60vh',
        overflowY: 'scroll'
    }

    let inputText = {
        width: '50%',
        height: '2em',
        marginBottom: '1em',
        border: '1px solid #294780',
        borderRadius: '0.3em'
    }

    let inputBtn = {
        background: '#294780',
        fontSize: '1em',
        border: '0.5em solid #294780',
        borderRadius: '0.3em',        
        color: 'white',
        marginLeft: '1em',
        marginBottom: '1.2em',
        cursor: 'pointer'
    }

    let chatInputDiv = {
        display : 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }

    let file = {
        position: 'absolute',
        zIndex: '-1',
        top: '10px',
        left: '8px',
        fontSize: '17px',
        color: '#b8b8b8'
    }

    let fileButton = {
        display: 'inlineBlock',
        marginLeft: '1.3em',
        marginBotton: '3em',
        padding: '3px 3px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#a8a8a8',
        fontSize: '3px',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer'


    }

    let roomTitle = {
        background : 'white',
        marginTop: '0',
        padding: '0',
        height: '10vh',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

    

    

    socket.on('connect', ()=>{
        console.log("Connected to the client")
    })

    let params = {
        room: props.match.params.roomname
    }

    socket.emit('join', params, function(err){
        console.log(err);
    } )

   
    

    let sendMsg = (e)=>{
        e.preventDefault();
       
        let message = document.getElementById('msg-writer').value;
        
        socket.emit("roomMsg",{
            username : currentUser,
            message: message
        });

       
        document.getElementById('chat-container').innerHTML += "<div style = 'margin-left: 1em; margin-right: 1em; word-wrap: break-word; border-bottom: 2px solid black; background: #335eb0; color: white;'><h4 style = 'margin-left: 1em'>You</h4><p style = 'margin-left: 1em'>"+message+"</p></div>"
        document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        document.getElementById('msg-writer').value = "";
    }

    let sendImage = (e)=>{
        let file = e.target.files[0];

        let imageReader = new FileReader();
        imageReader.readAsDataURL(file);
        imageReader.onload = function(){
        
       let blob = imageReader.result;
         
        socket.emit('sendImg', {
            username: currentUser,
            image:  blob
        });

        document.getElementById('chat-container').innerHTML +=`<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black; background: #335eb0; color: white;'><h4 style = 'margin-left: 1em'>You</h4><img style = 'margin-left: 1em' width = "500" src = ${imageReader.result}></div>`
         document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        }
    }

    let sendAudio = (e)=>{
        let file = e.target.files[0];

        let audioReader = new FileReader();
        audioReader.readAsDataURL(file);
        audioReader.onload = function(){
        
       let blob = audioReader.result;
         
        socket.emit('sendAudio', {
            username: currentUser,
            audio:  blob
        });

        document.getElementById('chat-container').innerHTML +=`<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black; background: #335eb0; color: white;'><h4 style = 'margin-left: 1em'>You</h4><audio style = 'margin-left: 1em' controls><source src="${audioReader.result}"></audio></div>`
         document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        }
    }

    let sendVideo = (e)=>{
        let file = e.target.files[0];

        let videoReader = new FileReader();
        videoReader.readAsDataURL(file);
        videoReader.onload = function(){
        
       let blob = videoReader.result;
         
        socket.emit('sendVideo', {
            username: currentUser,
            video:  blob
        });

        document.getElementById('chat-container').innerHTML +=`<div style = 'margin-left: 1em; margin-right:1em; word-wrap: break-word; border-bottom: 2px solid black; background: #335eb0; color: white;'><h4 style = 'margin-left: 1em'>You</h4><video style = 'margin-left: 1em' width = "500" controls><source src="${videoReader.result}"></video></div>`
         document.getElementById('chat-container').scrollTo(0, document.getElementById('chat-container').scrollHeight);
        }

    }

   
    
 
        
        


   

    return(
        <>
        <div id = "room-name-container" style = {roomTitle}>
           
           <img src = {roomIcon} width={50} height={50} style = {{marginRight: '1em'}}/>
           <h3>{roomName}</h3>
           <Link style = {{marginLeft: '0.5em', marginRight: '0.5em'}} to = "/home"><button style= {{color: 'white', background: '#294780', border: '5px solid #294780', borderRadius: '0.3em'}}>Leave</button></Link>
        </div>
       
            <div style = {membersChatContainer} className="container" id = {styles.membersChatContainer}>
                  
                  <div style = {memebersStyle} id = {styles.membersDropDownContainer}>
                     {roomMembers.map((users)=>{
                        if(users !== currentUser){
                            return <Link id = {styles.user} to = {"/profile/"+users}><h4 style = {{marginLeft: '2em', marginRight: '2em', height: '100', width: '12vw' }}>{users}</h4></Link>
                        }else if(users === currentUser){
                            return <Link id = {styles.user} to = {"/profile"}><h4 style = {{marginLeft: '2em', marginRight: '2em', height: '100', width: '12vw'}}>{currentUser}</h4></Link>
                        }
                        
                      })}
                  </div>
                   <br/>
                  <div style = {chatAreaStyle} id = "chat-area">
                       <div style = {chatcontainer} id = "chat-container">

                       </div>
                       <div style =  {chatInputDiv} id = "chat-inputs">
                            <input style = {inputText} type = "text" id = "msg-writer" placeholder="Write text..."/>
                            <button style = {inputBtn} id = "send-btn" onClick={sendMsg}>Send</button>
                           
                       </div>
                       <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} id = "file-btns">
                                
                                <label style = {fileButton} className="button" for = "upload-image"><img width={40}  src = "https://cdn-icons-png.flaticon.com/512/44/44289.png"/></label>
                                <input style = {file} type = "file" id = "upload-image"  accrpt= "image/**" onChange = {sendImage}/>
                               
                                <label style = {fileButton} className="button" for = "upload-audio"><img width={40}  src = "https://cdn-icons-png.flaticon.com/512/483/483031.png"/></label>
                                <input style = {file} type = "file" id = "upload-audio"  accept="audio/*" onChange = {sendAudio}/>

                                <label style = {fileButton} className="button" for = "upload-video"><img width={40}  src = "https://cdn-icons-png.flaticon.com/512/2859/2859706.png"/></label>
                                <input style = {file} type = "file" id = "upload-video"  accept="video/*" onChange = {sendVideo}/>
                              
                               
                                
                                
                            </div>
                  </div>
                    
            </div>
        </>
    );

}

export default withRouter(Room);