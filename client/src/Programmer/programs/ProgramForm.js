import React, { useState, useEffect } from 'react';
import { ApiGet, ApiPost, ApiPut } from '../../common/Api';
import DateStringFormatter from '../../common/DateStringFormatter';
import FlashMessage from '../../common/FlashMessage';
import InputField from '../../common/InputField';
import InputCheck from '../../common/InputCheck';
import { useNavigate, useParams } from "react-router";


const ProgramForm = (props) => {
    const navigate = useNavigate();
    const [programIdState, setProgramId] = useState(null);
    const [programNameState, setProgramName] = useState('');
    const [programLinkState, setProgramLink] = useState('');
    const [descriptionState, setDescription] = useState('');
    const [programLangState, setProgramLang] = useState('');
    const [programDbState, setProgramDb] = useState('');
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    //params in props.match.params.id byly undefined, tenhle statement to vyřešil 
    const { id } = useParams();
        
        useEffect(() => {
            if (id) {
            setProgramId(id);
        
            ApiGet("/api/program/" + id).then((data) => {
                setProgramName(data.name);
                setProgramLink(data.link);
                setProgramLang(data.techInfo.lang);
                setProgramDb(data.techInfo.db);
                setDescription(data.description);
            });
            }
        }, [id ]);
    
    

      const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            name: programNameState,
            link: programLinkState,
            techInfo: {
                lang: programLangState,
             
                db: programDbState,
            },
            description: descriptionState,
        
        };

        (programIdState
            ? ApiPut('/api/program/' + id, body)
            : ApiPost('/api/program/', body)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/programmer");
            })
            .catch( async (error) => {
                const er = await error
                console.log(er.message)
                setError(er.message)
                setSent(true);
                setSuccess(false);
            });

    }
    
    const sent = sentState;
    const success = successState;
    
    
        return (
            
            <div>
               
                <h1>{ id ? 'Upravit' : 'Vytvořit'} program info</h1>
                <hr />
                {errorState? <div className='alert alert-danger'>{errorState}</div> : ''}
                {sent && (
                    <FlashMessage
                        theme={success ? 'success' : ''}
                        text={
                            success
                                ? 'Uložení čláku proběhlo úspěšně.'
                                : ''
                        }
                    />
                )}
    
                <form onSubmit={handleSubmit}>
                    <InputField
                        required={true}
                        type="text"
                        name="programName"
                        min="3"
                        label="Text odkazu"
                        prompt="Např. GitHub"
                        value={programNameState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setProgramName(value);
                        //console.log(programNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="programLink"
                        min="3"
                        label="Adresa webu"
                        prompt="www.nazevWebu.cz"
                        value={programLinkState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setProgramLink(value);
                        //console.log(programNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="programLang"
                        min="2"
                        label="Programovací jazyk"
                        prompt="Typescript"
                        value={programLangState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setProgramLang(value);
                        //console.log(programNameState);
                        }}
                    />
                   
                    <InputField
                        required={true}
                        type="text"
                        name="programDb"
                        min="3"
                        label="Databáze"
                        prompt="MySql"
                        value={programDbState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setProgramDb(value);
                        //console.log(programNameState);
                        }}
                    />

                    <InputField
                        required={true}
                        type="textarea"
                        name="description"
                        minLength="10"
                        label="Popis web stránky"
                        prompt="Napište popis stránky"
                        rows="5"
                        value={descriptionState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setDescription(value);
                        //console.log(descriptionState);
                        }}
                    />

                    <input type="submit" className="" value="Uložit" />
                </form>
            </div>
        );
}

export default ProgramForm;