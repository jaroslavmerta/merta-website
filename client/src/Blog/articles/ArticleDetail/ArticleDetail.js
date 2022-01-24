import React, { useState, useEffect } from "react";
import { ApiGet } from "../../../common/Api";
import DateStringFormatter from "../../../common/DateStringFormatter";
import { useParams } from "react-router";
import SectionHeader from '../../../Header/SectionHeader/SectionHeader';
import styles from './ArticleDetail.module.scss'

const ArticleDetail = (props) => {
  const [articleNameState, setArticleName] = useState("");
  const [biographyState, setBiography] = useState("");
 

  const { id } = useParams();

  useEffect(() => {
    ApiGet("/api/article/" + id)
      .then((data) => {
        setArticleName(data.name);
        setBiography(data.biography);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  

  return (

    <>
    <SectionHeader 
    title = 'Blog'  
    />
    <div className={styles.articleDetail}>

      <h1>{articleNameState}</h1>
      

      <p>
        {biographyState}
      </p>
    </div>
    </>
  );
};

export default ArticleDetail;