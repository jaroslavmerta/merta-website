import React from 'react';
import {Link} from "react-router-dom";
import SectionHeader from './../Header/SectionHeader/SectionHeader';
const Programmer = () => {
    return (
        <>
        <SectionHeader
        title='Programování' 
        />

        <a href='https://github.com/jaroslavmerta/flexbox-editor/blob/2c612efd0c7f27f07c57b10935245492b965fbfb/README.md'>Flexbox-editor</a>
        

        {/* <Link to={"/programmer/editor"} className="">
            Programátorské portfolio
        </Link> */}
        </>
    );
}

export default Programmer;
