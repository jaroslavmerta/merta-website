import React from 'react';
import headerStyles from '../Header/Header.module.scss'
import Header from '../Header/Header';
import {useLocation} from "react-router-dom";
import NavBarHome from '../NavBarHome/NavBarHome';

const Home = () => {

    const location = useLocation();
    const url = location.pathname === "/home";

    return (
       <>
       <NavBarHome url={url}/></>
    );
}

export default Home;