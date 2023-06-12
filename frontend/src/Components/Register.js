import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"
import Footer from "./Footer";
import styles from './Register.module.css'







function Register(){

    let styleRegisterFormContainer = {
        marginTop: '10em',
       
        paddingBottom: '5em',
        textAlign: 'center',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        
    }

    let inputTextPassword = {

        width: '50%',
        height: '2em',
        marginBottom: '1em',
        border: '1px solid #294780',
        borderRadius: '0.3em'

    }
    let inputFLNames = {
        width: '46.4%',
        height: '2em',
        marginBottom: '1em',
        marginRight: '0.5em',
        border: '1px solid #294780',
        borderRadius: '0.3em'
    }

    let registerBtn = {
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

    let CropBtn = {
        /*#335eb0*/
       background: '#294780',
       fontSize: '1em',
       border: '0.5em solid #294780',
       borderRadius: '0.3em',
       marginTop: '1.5em',
       color: 'white',
       cursor: 'pointer'
   }

    let modal = {

        display: 'none', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        zIndex: '1', /* Sit on top */
        left: '0',
        top: '0',
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0,0.4)' /* Black w/ opacity */


    }

    let modalContent = {
        backgroundColor: '#fefefe',
        margin: '15% auto', /* 15% from the top and centered */
        padding: '20px',
        border: '1px solid #888',
        width: '80%', /* Could be more or less, depending on screen size */
    }

    let close = {
       
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '1em',
        marginTop: '1em',
        marginBottom: '1em',
        color: 'red',
        background: 'white',
        cursor: 'pointer'
    }

    let sendRegisterData = async(e)=>{
        e.preventDefault();

        let username = document.getElementById('username').value;
        let firstname = document.getElementById('fname').value;
        let lastname = document.getElementById('lname').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let imgUrl = document.getElementById('image-url').value;
        let imgBinary = imgUrl.split(",");

        console.log(imgBinary[0]);
        

        let data = {
            username : username,
            fname : firstname,
            lname: lastname,
            email: email,
            password: password,
            imgUrl: imgUrl
        }

        let response = await fetch('/api/register', {
            method: 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let json = await response.json();
        if(response.ok){
            
            
            window.location.href = json.toLink;
        }else{
            window.location.href = '/register';
        }
        //console.log(json)
    }
    let [cropper, setCropper] = useState(null);
    let displayAndCrop = (e)=>{
        //console.log('hello')
        //console.log(e.target.files[0])

        // Get the modal
        var modal = document.getElementById("myModal");

       

        modal.style.display = "block";
        

       

        // When the user clicks anywhere outside of the modal, close it
        /*window.onclick = function(event) {
             if (event.target == modal) {
                 modal.style.display = "none";
            }
        }*/


        let imageDiv = document.getElementById("img-display")
        imageDiv.style = "display: block;"
        let pfpDiv = document.getElementById('pfp-display')
        pfpDiv.style = "display: none;"
        let displayImage = document.getElementById("display-image")
        let reader = new FileReader();
        
        reader.onload = function(){
            displayImage.src = reader.result;

            setCropper(new Cropper(displayImage,{

                aspectRatio: 0,
                viewMode: 0,
              
               }));
            
             
        }

        reader.readAsDataURL(e.target.files[0])
    }

    let getCroppedData = (e)=>{
        e.preventDefault();
       
        let pfpDiv = document.getElementById('pfp-display')
        pfpDiv.style =  "display: block;"
        let imageDiv = document.getElementById("img-display")
        imageDiv.style = "display: none;"

        let pfp = document.getElementById('pfp-image')
        pfp.src = cropper.getCroppedCanvas().toDataURL("image/png")

        let imgUrl = document.getElementById('image-url')
        imgUrl.value = cropper.getCroppedCanvas().toDataURL("image/png")

        let modal = document.getElementById("myModal");
        modal.style.display = "none";

    }

    let closeModal = (e)=>{
         // Get the <span> element that closes the modal
       
         var modal = document.getElementById("myModal");
        // When the user clicks on <span> (x), close the modal
       
        modal.style.display = "none";
        

    }

    window.onclick = function(event) {
        if (event.target ==  document.getElementById("myModal")) {
          modal.style.display = "none";
        }
      }


   


return(

    <>
       
    <div style = {styleRegisterFormContainer} className = "container" id = {styles.loginFormContainer}>
        <h2 style = {{ paddingTop: '2.5em', textAlign: 'center'}} id = {styles.title}>A hangout area for Section 48</h2>
        <h2 style = {{ paddingTop: '2.5em', textAlign: 'center'}}>Sign Up</h2>
            <form style = {formsStyle} action = "/api/register" method = "POST" encType="multipart/form-data">
                <input style = {inputTextPassword} type = "text" id = "username" name = "username" placeholder = "Username" />
                <div id = "first-last-name-container">
                    <input style = {inputFLNames} type = "text" id = "fname" name = "fname" placeholder = "First Name" />
                    <input style = {inputFLNames} type = "text" id = "lname" name = "lname" placeholder = "Last Name" />
                </div>
                <input style = {inputTextPassword} type = "email" name = "email" id = "email" placeholder = "E-Mail" />
                <input style = {inputTextPassword} type = "password" name = "password" id = "password" placeholder = "Password" />
                <label style = {{marginBottom: '1em'}} for = "img">Upload Profile Pic</label>
                <input type="file" name = "img" id = "img" accept="image/*" onChange={displayAndCrop} style = {{marginBottom: "1em"}}/>
                <div style = {modal} id="myModal" class="modal">
                    <span style = {close} onClick={closeModal} class="close">X</span>
                    <div style = {modalContent} class="modal-content">
                       
                        <div id = "img-display" style = {{display: "none", marginTop: "2em"}}>
                            <img src ="" id = "display-image"  width = "500"/>
                            <button style = {CropBtn} id = "crop" onClick={getCroppedData}>Crop</button>
                        </div>
                       
                    </div>
                </div>
                
               
                <div id ="pfp-display" style = {{display: "none", marginTop: "2em"}}>
                    <img src ="" id = "pfp-image" width = "200" height = "200" style = {{marginTop: "2em"}} />
                    <input value = "https://media.defense.gov/2018/Jun/11/2001929567/400/400/0/180611-D-BD104-001.JPG" type="hidden" name = "image-url" id = "image-url" style = {{marginBottom: "1em"}}/>
                </div>
                <input style= {registerBtn} type = "submit" id = "signup-btn" value= "Sign Up" onClick={sendRegisterData} />
            </form>
        
            <div id = "register-link" style = {{marginTop: '1em'}}>
                Have an account already? <Link to = "/">Log in</Link>
            </div>
    </div>
    <Footer/>    
    
    </>

);




}


export default Register;
