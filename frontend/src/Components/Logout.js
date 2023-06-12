import React, { useEffect } from "react";

function Logout(){

    useEffect(()=>{

        async function fetchData(){

            let response = await fetch("/api/logout");
            let json = await response.json();

            window.location.href = json.toLink;
        }

        fetchData();
    }, [])

    return(
        <div>

        </div>

    );
}

export default Logout;