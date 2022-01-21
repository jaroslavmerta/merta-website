import React, { useState, useEffect } from 'react';
import { ApiGet } from '../../common/Api';
import ArticleList from './ArticleList/ArticleList';
import SectionHeader from '../../Header/SectionHeader/SectionHeader';

const ArticleIndex = (props) => {



    const [articleState, setArticles] = useState([]);


    useEffect(() => {

    ApiGet('/api/articles')
    .then((data) => setArticles(data))
    .catch((err)=>{console.log('Žádné články', err)})

    },[]);

  
    return (
        <div>
           <SectionHeader
           title = 'Blog'
           />

            <div className="row">
                <div className="col">
                    <ArticleList
                        logged = {props.logged}
                        items={articleState}
                        label="Počet článků:"
                    
                    />
                </div>
                
            </div>
        </div>
    );
};
export default ArticleIndex;