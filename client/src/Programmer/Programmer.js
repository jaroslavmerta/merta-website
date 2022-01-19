import React from 'react';
import {Link} from "react-router-dom";
const Programmer = () => {
    return (
        
        <Link to={"/programmer/editor"} className="">
             Programátorské portfolio
        </Link>
    );
}

export default Programmer;
