import React from 'react';
//scss
import styles from './Header.module.scss'
import NavBar from '../NavBar/NavBar';

const Header = (props) => {
    const urlHome = props.urlHome;

    return (
        <header className={ urlHome ? (`${styles.height100} ${styles.headerHome}`) : styles.header} >
            
          
           {!urlHome && <div className={ styles.logo}>
                <span>J. Merta</span>
            </div>}
            
        
            <NavBar 
            url= {props.url}
            />
        </header>
    );
}

export default Header;