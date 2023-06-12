import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { useState } from "react";
import styles from './Createserver.module.css';



function Createserver(){

    let createRoom = async(e)=>{
       e.preventDefault();

       let data = {
        img: document.getElementById("image-url").value,
        roomname: document.getElementById('room-name').value
       }

       let response = await fetch('/api/createserver', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }
       });

       let json = await response.json();

       window.location.href = json.roomLink;

    }

    let serverFormStyle = {
        background: 'white',
       
        marginTop: '15%',
        
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
     

    }
    let formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'spaceBetween'
    }

    let inputText = {
        width: '50%',
        height: '2em',
        marginBottom: '1em',
        border: '1px solid #294780',
        borderRadius: '0.3em',
        marginTop: '2rem'
    }

    let inputBtn={
        background: '#294780',
        fontSize: '1em',
        border: '0.5em solid #294780',
        borderRadius: '0.3em',
        marginTop: '1.5em',
        color: 'white',
        marginBottom: '2rem'
    }
    let groupIconFile = {
        position: 'absolute',
        zIndex: '-1',
        top: '10px',
        left: '8px',
        color: '#b8b8b8'
    }
    let groupIconLabel = {
        marginTop: '1em',
        display: 'inline-block',
        padding: '7px 7px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#294780',
        color: '#fff'
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
    let CropBtn = {
        /*#335eb0*/
       background: '#294780',
       fontSize: '1em',
       border: '0.5em solid #294780',
       borderRadius: '0.3em',
       marginTop: '1.5em',
       color: 'white'
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

    


    return(
        <>
            <div style={serverFormStyle} id = {styles.serverFormContainer} className="container">
                <form style = {formStyle} action = "/api/createserver" method= "POST">
                    <label style={groupIconLabel} for = "img">Group Icon</label>
                    <input style={groupIconFile} onChange={displayAndCrop} type = "file" name = "img" id = "img" accept="image/*" />
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
                    <input value = "https://cdn-icons-png.flaticon.com/512/33/33308.png" type = "hidden" name = "image-url" id = "image-url" style = {{marginBottom: "1em"}}/>
                </div>
                    <input style={inputText} type = "text" id = "room-name" name = "room-name" placeholder="Room Name"/>
                    <input style={inputBtn} type = "submit" value = "Create Server" onClick={createRoom}/>
                </form>
            </div>
        </>
    );

}

export default Createserver;
