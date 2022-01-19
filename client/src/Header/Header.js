import React from 'react';
import { useLocation } from 'react-router-dom'
//scss
import styles from './Header.module.scss'
import NavBar from '../NavBar/NavBar';

const Header = (props) => {
    const url = props.url;

    return (
        <header className={ url ? (`${styles.height100} ${styles.headerHome}`) : styles.header} >
            
          
           {!url && <div className={ styles.logo}>
                <span>J. Merta</span>
            </div>}
            
        
            <NavBar url={url}/>
        </header>
    );
}

export default Header;