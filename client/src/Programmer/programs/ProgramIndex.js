import React, { useState, useEffect } from 'react';
import { ApiGet } from '../../common/Api';
import ProgramList from './ProgramList/ProgramList';
import SectionHeader from '../../Header/SectionHeader/SectionHeader';


const ProgramIndex = (props) => {



    const [programState, setPrograms] = useState([]);


    useEffect(() => {

    ApiGet('/api/programs')
    .then((data) => setPrograms(data))
    .catch((err)=>{console.log('Žádné články', err)})

    },[]);

  
    return (
        <div>
            <SectionHeader
           title = 'Programování'
           />

            <div className="row">
                <div className="col">
                    <ProgramList
                        logged = {props.logged}
                        items={programState}
                        label="Počet programů:"
                    
                    />
                </div>
                
            </div>
        </div>
    );
};
export default ProgramIndex;