import React, { useState, useEffect } from 'react';
import { ApiGet, ApiPost, ApiPut } from '../../common/Api';
import DateStringFormatter from '../../common/DateStringFormatter';
import FlashMessage from '../../common/FlashMessage';
import InputField from '../../common/InputField';
import InputCheck from '../../common/InputCheck';
import { useNavigate, useParams } from "react-router";
import SectionHeader from '../../Header/SectionHeader/SectionHeader';

const ArticleForm = (props) => {
    const navigate = useNavigate();
    const [articleIdState, setArticleId] = useState(null);
    const [articleNameState, setArticleName] = useState('');
    const [biographyState, setBiography] = useState('');
    const [articleRoleState, setArticleRole] = useState('');
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    //params in props.match.params.id byly undefined, tenhle statement to vyřešil 
    const { id } = useParams();
        
        useEffect(() => {
            if (id) {
            setArticleId(id);
        
            ApiGet("/api/article/" + id).then((data) => {
                setArticleName(data.name);
                setBiography(data.biography);
                
            });
            }
        }, [id ]);
    
    

      const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            name: articleNameState,
            biography: biographyState,
        
        };

        (articleIdState
            ? ApiPut('/api/article/' + id, body)
            : ApiPost('/api/article/', body)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/writer");
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
                <SectionHeader
                title = 'Blog'
                />
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
                        name="articleName"
                        min="3"
                        label="Název článku"
                        prompt="Např. Teorie světa"
                        value={articleNameState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setArticleName(value);
                        //console.log(articleNameState);
                        }}
                    />

                    <InputField
                        required={true}
                        type="textarea"
                        name="biography"
                        minLength="10"
                        label="Text článku"
                        prompt="Napište text článku"
                        rows="5"
                        value={biographyState}
                        handleChange={(e) => {
                        const { value } = e.target;
                        setBiography(value);
                        //console.log(biographyState);
                        }}
                    />

                    <input type="submit" className="btn btn-primary" value="Uložit" />
                </form>
            </div>
        );
}

export default ArticleForm;