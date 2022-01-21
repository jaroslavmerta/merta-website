import React from 'react';
import {Link} from "react-router-dom";
import SectionHeader from './../Header/SectionHeader/SectionHeader';
const Programmer = () => {
    return (
        <>
            <SectionHeader
            title='Programování' 
            />

            <Link to={"/programmer/editor"} className="">
                Programátorské portfolio
            </Link>
        </>
    );
}

export default Programmer;
