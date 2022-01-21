import React, { useState, useEffect } from 'react';
import { ApiGet } from '../../common/Api';
import WebPageList from './WebPageList/WebPageList';
import SectionHeader from './../../Header/SectionHeader/SectionHeader';


const WebPageIndex = (props) => {



    const [webPageState, setWebPages] = useState([]);


    useEffect(() => {

    ApiGet('/api/webPages')
    .then((data) => setWebPages(data))
    .catch((err)=>{console.log('Žádné články', err)})

    },[]);

  
    return (
        <div>
            <SectionHeader
           title = 'Webové stránky'
           />

            <div className="row">
                <div className="col">
                    <WebPageList
                        logged = {props.logged}
                        items={webPageState}
                        label="Počet článků:"
                    
                    />
                </div>
                
            </div>
        </div>
    );
};
export default WebPageIndex;