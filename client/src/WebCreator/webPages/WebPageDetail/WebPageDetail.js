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
  const [webPageDbState, setWebPageDb] = useState('');
  const [webPageLinkState, setWebPageLink] = useState('');

  const { id } = useParams();

  useEffect(() => {
    ApiGet("/api/webPage/" + id)
      .then((data) => {
        setWebPageName(data.name);
        setWebPageLink(data.link);
        setWebPageLang(data.techInfo.backend);

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
    
      <h1 className="testik">{webPageNameState}</h1>
{/* 
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
      </table> */}

          {/* Mobile view */}
      <div className={styles.tableBoxSmall}>
        <div className={styles.tbrWraper}>
          <div className={styles.tbr}>
            <div className={styles.tbd}>
           <h3>Odkaz:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
             <a href={webPageLinkState}>{webPageNameState}</a>
            </div>
          </div>
        
          <div className={styles.tbr}>
            <div className={styles.tbd}>
            <h3>Programovací jazyk:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
              {webPageLangState}
            </div>
          </div>
          <div className={styles.tbr}>
          </div>
          <div className={styles.tbr}>
            <div className={styles.tbd}>
            <h3>Databáze:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
              <p >{webPageDbState}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className={styles.tableBoxBig}>
        <div className={styles.tbClWraper}>
            <div className={styles.tbd}>
           <h3>Odkaz:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
              <h3>Programovací jazyk:&nbsp;&nbsp;</h3>
            </div>
          
            <div className={styles.tbd}>
            <h3>Databáze:&nbsp;&nbsp;</h3>
            </div>
        </div>
        <div className={styles.tbClWraper}>
            <div className={styles.tbd}>
            <a href={webPageLinkState}>{webPageLinkState}</a>
            </div>
            <div className={styles.tbd}>
            {webPageLangState}
            </div>
          
            <div className={styles.tbd}>
            {webPageDbState}
            </div>
        </div>

      </div>



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