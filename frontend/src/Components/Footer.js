import React from "react";


function Footer(){

    let footerStyle = {
        background: '#363636',
        marginTop: '6em',
        textAlign: 'center',
        color: 'white',
        minHeight: '10vh',
        width: '100vw',
        paddingBottom: '2em'
        
        
        
    }

    return(
    <div style = {footerStyle} className="container" id = "footer">
        <h3 style = {{paddingTop: '0.5em'} }>By Kavish Tomar</h3>
        <p>Follow the developer on</p>
        <span ><a href="https://www.instagram.com/_kavishtomar_/"><img width = "50" style = {{marginRight: '0.5em'}}src = "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"/></a>
            <a href="https://github.com/KavishTomar4"><img style = {{marginRight: '0.5em'}} width = "50" src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"/></a>
            <a href="https://twitter.com/KavishTomar4"><img width = "50" src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png"/></a>
        </span>
    </div>
    );

}

export default Footer;