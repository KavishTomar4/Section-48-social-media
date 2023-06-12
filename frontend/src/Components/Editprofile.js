import React, { useEffect } from "react";
import Cropper from "cropperjs";
import { useState } from "react";
import "cropperjs/dist/cropper.css"
import styles from './Editprofile.module.css';

function Editprofile(){

    let [you, setYou] = useState({})
   
    useEffect(()=>{
    
    let fetchData = async()=>{

        let response = await fetch('/api/editpage');
        let json = await response.json();
            
        setYou(json.you);

    }

    fetchData();
    
   }, [])

    let divStyle = {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        marginTop: '10%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        


    }
    let formStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
    let changeBtn = {
        /*#335eb0*/
       background: '#294780',
       fontSize: '1em',
       border: '0.5em solid #294780',
       borderRadius: '0.3em',
       marginTop: '1.5em',
       marginBottom: '1.5em',
       color: 'white'
   }
   let CropBtn = {
    /*#335eb0*/
   background: '#294780',
   fontSize: '1em',
   border: '0.5em solid #294780',
   borderRadius: '0.3em',
   marginTop: '1.5em',
   color: 'white'
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
    background: 'white'
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
    let updateProfile = async(e)=>{

        let data = {
            username: document.getElementById('username').value,
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            img:  document.getElementById('image-url').value,
            bio: document.getElementById('bio').value,
        }
        
        let response = await fetch('/api/editprofile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let json = await response.json();

        if(response.ok)
        {
            window.location.href = '/profile';
        }

        
            
        
       
    }



    return(
        <>
        <div style = {divStyle} id = {styles.profileChangeFormContainer}>
            <h3>Edit Profile</h3>
            <form style = {formStyle} method = "POST" action = "/api/editprofile">
                <input onChange = {displayAndCrop} type = "file" id = "profile-changer"/>
                <div style = {modal} id="myModal" className="modal">
                    <span style = {close} onClick={closeModal} className="close">X</span>
                    <div style = {modalContent} className="modal-content">
                       
                        <div id = "img-display" style = {{display: "none", marginTop: "2em"}}>
                            <img src ="" id = "display-image"  width = "500"/>
                            <button style = {CropBtn} id = "crop" onClick={getCroppedData}>Crop</button>
                        </div>
                       
                    </div>
                </div>
                <div id ="pfp-display" style = {{display: "none", marginTop: "2em"}}>
                    <img src ="" id = "pfp-image" width = "200" height = "200" style = {{marginTop: "2em"}} />
                    <input defaultValue = {you.img} type="hidden" name = "image-url" id = "image-url" style = {{marginBottom: "1em"}}/>
                </div>
                <input style = {inputTextPassword} type = "text" id = "username" placeholder="Username" defaultValue = {you.username}/>
                <div id = "fname-lname-container">
                    <input style = {inputFLNames} type = "text" id = "fname" placeholder="First Name" defaultValue = {you.firstname}/>
                    <input style = {inputFLNames} type = "text" id = "lname" placeholder="Last Name" defaultValue = {you.lastname}/>
                </div>
                <input style = {inputTextPassword} type = "text" placeholder="Add Bio" id = "bio" name = "bio" defaultValue = {you.bio}/>
                <input style = {changeBtn} type = "submit" id = "btn-submit" value = "Update" onClick = {updateProfile} />
            </form>
        </div>
        </>

    );


}

export default Editprofile;