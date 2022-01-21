import React, { useState, useEffect } from "react";
import { ApiGet } from "../../../common/Api";
import DateStringFormatter from "../../../common/DateStringFormatter";
import { useParams } from "react-router";

import styles from './WebPageDetail.module.scss'
import SectionHeader from './../../../Header/SectionHeader/SectionHeader';

const WebPageDetail = (props) => {
  const [webPageNameState, setWebPageName] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [webPageLangState, setWebPageLang] = useState('');
  const [webPageArchState, setWebPageArch] = useState('');
  const [webPageDbState, setWebPageDb] = useState('');
  const [webPageLinkState, setWebPageLink] = useState('');

  const { id } = useParams();

  useEffect(() => {
    ApiGet("/api/webPage/" + id)
      .then((data) => {
        setWebPageName(data.name);
        setWebPageLink(data.link);
        setWebPageLang(data.techInfo.backend);
        setWebPageArch(data.techInfo.arch);
        setWebPageDb(data.techInfo.db);
        setDescriptionState(data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  

  return (

    <>
    <SectionHeader
    title = 'Webové stránky'
    />
    <div className={styles.webPageDetail}>
    
      <h1>{webPageNameState}</h1>

      <table>
        <tbody>
          <tr>
            <td>Odkaz:</td>
            <td><a href={webPageLinkState}>{webPageLinkState}</a></td>
          </tr>
          <tr>
            <td>Backend:</td>
            <td>{webPageLangState}</td>
          </tr>
          <tr>
            <td>Architektura:&nbsp;</td>
            <td>{webPageArchState}</td>
          </tr>
          <tr>
            <td>Databáze:</td>
            <td>{webPageDbState}</td>
          </tr>
        </tbody>
      </table>
      {/* <ul>
          <li>Odkaz: <a href={webPageLinkState}>{webPageNameState}</a></li>
          <li>Backend: {webPageLangState}</li>
          <li>Architektura: {webPageArchState}</li>
          <li>Databáze: {webPageDbState}</li>
      </ul> */}
      <br/>
      <h2>Popis</h2> 
      <p>
        {descriptionState}
      </p>
    </div>
    </>
  );
};

export default WebPageDetail;