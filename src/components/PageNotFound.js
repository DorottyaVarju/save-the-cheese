import React from "react";
import '../css/PageNotFound.css';

function PageNotFound(){
    return (
        <div id="notFound">
            <img className="notFound" alt="Page Not Found" src="images/yescheese.png" title="Page Not Found"></img>
            <h1>Ooops, something went wrong!</h1>
        </div>
    );
}

export default PageNotFound;