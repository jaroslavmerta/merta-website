import React, { useState, useEffect } from 'react';
import { ApiGet, ApiPost, ApiPut } from '../../common/Api';
import DateStringFormatter from '../../common/DateStringFormatter';
import FlashMessage from '../../common/FlashMessage';
import InputField from '../../common/InputField';
import InputCheck from '../../common/InputCheck';
import { useNavigate, useParams } from "react-router";


const WebPageForm = (props) => {
    const navigate = useNavigate();
    const [webPageIdState, setWebPageId] = useState(null);
    const [webPageNameState, setWebPageName] = useState('');
    const [webPageLinkState, setWebPageLink] = useState('');
    const [descriptionState, setDescription] = useState('');
    const [webPageLangState, setWebPageLang] = useState('');
    const [webPageArchState, setWebPageArch] = useState('');
    const [webPageDbState, setWebPageDb] = useState('');
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    //params in props.match.params.id byly undefined, tenhle statement to vyřešil 
    const { id } = useParams();
        
        useEffect(() => {
            if (id) {
            setWebPageId(id);
        
            ApiGet("/api/webPage/" + id).then((data) => {
                setWebPageName(data.name);
                setWebPageLink(data.link);
                setWebPageLang(data.techInfo.backend);
                setWebPageArch(data.techInfo.arch);
                setWebPageDb(data.techInfo.db);
                setDescription(data.description);
            });
            }
        }, [id ]);
    
    

      const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            name: webPageNameState,
            link: webPageLinkState,
            techInfo: {
                backend: webPageLangState,
                arch: webPageArchState,
                db: webPageDbState,
            },
            description: descriptionState,
        
        };

        (webPageIdState
            ? ApiPut('/api/webPage/' + id, body)
            : ApiPost('/api/webPage/', body)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/webmaker");
            })
            .catch( async (error) => {
                const er = await error
                console.log('here', er.message)
                setError(er.message)
                setSent(true);
                setSuccess(false);
            });

    }
    
    const sent = sentState;
    const success = successState;
    
    
        return (
            
            <div>
               
                <h1>{ id ? 'Upravit' : 'Vytvořit'} článek</h1>
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
                        name="webPageName"
                        min="3"
                        label="Text odkazu"
                        prompt="Např. Teorie světa"
                        value={webPageNameState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setWebPageName(value);
                        //console.log(webPageNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="webPageLink"
                        min="3"
                        label="Adresa webu"
                        prompt="www.nazevWebu.cz"
                        value={webPageLinkState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setWebPageLink(value);
                        //console.log(webPageNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="webPageLang"
                        min="2"
                        label="Backend jazyk"
                        prompt="PHP"
                        value={webPageLangState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setWebPageLang(value);
                        //console.log(webPageNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="webPageArch"
                        min="3"
                        label="Architektura"
                        prompt="MVC"
                        value={webPageArchState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setWebPageArch(value);
                        //console.log(webPageNameState);
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="webPageDb"
                        min="3"
                        label="Databáze"
                        prompt="MySql"
                        value={webPageDbState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setWebPageDb(value);
                        //console.log(webPageNameState);
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

export default WebPageForm;