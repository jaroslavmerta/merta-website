import React from 'react';
import styles from './SectionHeader.module.scss'

const SectionHeader = (props) => {
    return (
        <div className={styles.sectionHeader}>
            <h1>{props.title}</h1>
            <hr />
        </div>
    );
}

export default SectionHeader;