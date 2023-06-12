import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Home.module.css'




function Home(){

    
     let [theUser, setUser] = useState({});

     let [rooms, setRooms] = useState([]);
    
        

    useEffect(()=>{

        let json;
        async function fetchData(){ 
        let response = await fetch('/api/home')
        json = await response.json()
        //console.log(json)
        if(response.ok){
            
            if(json.toLink !== ''){
                window.location.href = json.toLink;
            }
            console.log(json.thisUser);
            setUser(json.thisUser);

            console.log(json.allServers);

            setRooms(json.allServers)
           
           
        }
        
      
      
        

       
    }


    
    fetchData();

   

    }, [])

  

    let styleUser = {

        textAlign : 'center',
        margin: '0',
        padding: '0.6em'
        




    }

    let userContainer = {

        background : 'white',
        marginTop: '0',
        padding: '0',
        height: '8vh',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

    let friendsRoomContainer = {
        background: 'white',
        marginTop: '0%',
        
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        overflowY: 'scroll'
        
    }

    let roomTitleStyle = {
        background: '#335eb0',
        color: 'white',
        textAlign: 'center',
        marginTop: '10%',
        marginBottom: '0%',
        height: '5vh',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }

    let mobileDrop = (e)=>{

        if( document.getElementById(styles.dropDownMenu).style.display === 'none'){
            document.getElementById(styles.dropDownMenu).style.display = 'flex';
            document.getElementById(styles.dropDownMenu).style.flexDirection = 'column';
            document.getElementById(styles.dropDownMenu).style.justifyContent = 'space-between';
            document.getElementById(styles.dropDownMenu).style.alignItems = 'center';
        
        }else{
            document.getElementById(styles.dropDownMenu).style.display = 'none';
        }
    }

   

    return(
        <>
            <div className="container" id = "user-container" style={userContainer}>
                
                 <img src = {theUser.img} width = "50" height = "50" style={{borderRadius: '10px'}} /> 
                 <h3 id = "userInfo" style={styleUser}>Welcome {theUser.username} <Link to = "/profile"><button style = {{background: "#335eb0", color:"white", border: "4px solid #335eb0", borderRadius: "5px", marginLeft: "1em"}} id={styles.profileBtn}>Profile</button></Link> </h3>
                 <Link to = "/createserver" ><button style = {{background: "#335eb0", color: "white", border: "4px solid #335eb0", borderRadius: "5px", marginLeft: "1em"}} id={styles.profileBtn}>Create Room</button></Link>
                 <button id = {styles.mobileDropDown} onClick = {mobileDrop} ><img src = "https://icon-library.com/images/dropdown-menu-icon/dropdown-menu-icon-16.jpg" width = "20"/></button>
                 
            </div>
            <div style = {{display: 'none', background: 'white'}} id = {styles.dropDownMenu}>
                <Link style = {{marginBottom: '0.5em'}} to = "/profile">Your Profile</Link>
                <Link style = {{marginBottom: '0.5em'}} to = "/createserver">Create Server</Link>
            </div>
            <div style={roomTitleStyle} id = {styles.roomTitle}>
                <h3>Rooms</h3>
            </div>
            <div id = {styles.friendsRoomContainer} className = "container" style = {friendsRoomContainer}>
                <div>
                  
                    <div id = "server-names-container" >
                       
                        {rooms.map((room)=>{
                            
                            return <div style = {{width:"100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1em'}}><img src = {room.img} width = "50" height = "50" style={{borderRadius: '10px', marginRight: '30px'}} /><a style = {{textDecoration: 'none'}} href={`/room/${room.roomname}`} ><h3>{room.roomname}</h3></a></div>
                            
                        })}
                           
                        
                    </div>
                    <div id = "people-name-container">

                    </div>
                        
                </div>
            </div>
        </>
    );

}

export default Home;

