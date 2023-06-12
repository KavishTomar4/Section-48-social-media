import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Yourprofile(){

    let [thisUser, setThisUser] = useState({})
    useEffect(()=>{
    
        let fetchData = async()=>{
            let response = await fetch('/api/profile');
            let json = await response.json();

            if(response.ok){
                console.log(json)
                setThisUser(json.user);
            }
        }

        fetchData();

    }, [])
    
    let profileDetailStyle = {
        background: 'white',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }
    let EditBtn = {
        /*#335eb0*/
       background: '#294780',
       fontSize: '1em',
       border: '0.5em solid #294780',
       borderRadius: '0.3em',
       marginTop: '1.5em',
       marginBottom: '1em',        
       color: 'white',
       cursor: 'pointer'
   }

   let LogoutBtn = {
    /*#335eb0*/
   background: '#bf3939',
   fontSize: '1em',
   border: '0.5em solid #bf3939',
   borderRadius: '0.3em',
   marginTop: '1.5em',
   marginLeft: '1em',        
   color: 'white',
   cursor: 'pointer'
}

    return(
        <>
        <div style = {profileDetailStyle} id = "profile-container" className="container">
            <img src = {thisUser.img} style = {{marginTop: '2em',borderRadius: "0.5em"}} width = "150" height = "150"/>
            <h2 style = {{color: "black" , marginTop: "1em", marginBottom: "0"}}>{thisUser.username}</h2>
            <h3 style = {{color: "#9d9d9e", marginTop: "0.2em"}}>{thisUser.firstname} {thisUser.lastname}</h3>
            <p>{thisUser.bio}</p>
            <div id = "logout-editprofile-container">
                <Link to = "/edit"><button style = {EditBtn}>Edit Profile</button></Link>
                <Link style = {{marginLeft: '0.5em', marginRight: '0.5em'}} to = "/home"><button style= {EditBtn}>Home</button></Link>
                <Link to = "/logout"><button style = {LogoutBtn}>Log out</button></Link>
            </div>
        </div>
        </>
    );


}


export default Yourprofile;