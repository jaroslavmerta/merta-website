import React from 'react';
import styles from './BlogHeader.module.scss'

const BlogHeader = (props) => {
    return (
        <div className={styles.blog}>
            <h1>Blog</h1>
            <hr />
        </div>
    );
}

export default BlogHeader;