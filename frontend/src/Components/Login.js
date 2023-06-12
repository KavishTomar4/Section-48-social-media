import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import styles from './Login.module.css';



function Login(){


    useEffect(()=>{
        
          async function fetchData(){
            
            let response = await fetch('/api/getlogin');
            let json = await response.json();

            if(response.ok){
                window.location.href = json.toLink;
            }
          

        }

        fetchData();


    }, [])

    let styleLoginFormContainer = {
        marginTop: '10em',
        
        paddingBottom: '5em',
        textAlign: 'center',
        background: 'white',
        
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }

    let inputTextPassword = {

        width: '50%',
        height: '2em',
        marginBottom: '1.5em',
        border: '1px solid #294780',
        borderRadius: '0.3em'

    }

    let loginBtn = {
         /*#335eb0*/
        background: '#294780',
        fontSize: '1em',
        border: '0.5em solid #294780',
        borderRadius: '0.3em',
        marginTop: '1.5em',        
        color: 'white',
        cursor: 'pointer'
    }

    let formsStyle = {
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
    }

  

    let sendLoginData = async(e) => {
        e.preventDefault()
        
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        

        let data = {
            username: username,
            password: password
        }

        let response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let json = await response.json();

        window.location.href = json.toLink;

    }

    

    return(
        <>
       
        <div style = {styleLoginFormContainer} className = "container" id = {styles.loginFormContainer}>
            <h2 style = {{ paddingTop: '2.5em', textAlign: 'center;'}} id = {styles.title}>A hangout area for Section 48</h2>
            <h2 style = {{ paddingTop: '2.5em', textAlign: 'center;'}}>Login</h2>
            <form style = {formsStyle} action = "/api/login" method = "POST">
                <input style = {inputTextPassword} type = "text" id = "username" placeholder = "Username" />
                <input style = {inputTextPassword} type = "password" id = "password" placeholder = "Password" />
                <input style= {loginBtn} type = "submit" id = "login-btn" value= "Login" onClick = {sendLoginData} />
            </form>
            <div id = "register-link" style = {{marginTop: '1em'}} >
                Or <Link to = "/register">click here to Sign up</Link>
            </div>
        </div>
        <Footer/> 
       
        </>

    
   
        
    );


}

export default Login

