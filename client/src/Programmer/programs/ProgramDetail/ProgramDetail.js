import React, { useState, useEffect } from "react";
import { ApiGet } from "../../../common/Api";
import DateStringFormatter from "../../../common/DateStringFormatter";
import { useParams } from "react-router";

import styles from './ProgramDetail.module.scss'
import SectionHeader from '../../../Header/SectionHeader/SectionHeader';

const ProgramDetail = (props) => {
  const [programNameState, setProgramName] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [programLangState, setProgramLang] = useState('');

  const [programDbState, setProgramDb] = useState('');
  const [programLinkState, setProgramLink] = useState('');

  const { id } = useParams();

  useEffect(() => {
    ApiGet("/api/program/" + id)
      .then((data) => {
        setProgramName(data.name);
        setProgramLink(data.link);
        setProgramLang(data.techInfo.lang);
       
        setProgramDb(data.techInfo.db);
        setDescriptionState(data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  

  return (

    <>
    <SectionHeader
    title = 'Programování'
    />
    <div className={styles.programDetail}>
    
      <h1>{programNameState}</h1>

      {/* <table>
        <tbody>
          <tr>
            <td>Odkaz:&nbsp;&nbsp;</td>
            <td><a href={programLinkState}>{programLinkState}</a></td>
          </tr>
          <tr>
            <td>Programovací jazyk:&nbsp;&nbsp;</td>
            <td>{programLangState}</td>
          </tr>
          <tr>
            <td>Databáze:&nbsp;&nbsp;</td>
            <td>{programDbState}</td>
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
             <a href={programLinkState}>{programNameState}</a>
            </div>
          </div>
        
          <div className={styles.tbr}>
            <div className={styles.tbd}>
            <h3>Programovací jazyk:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
              {programLangState}
            </div>
          </div>
          <div className={styles.tbr}>
            <div className={styles.tbd}>
            <h3>Databáze:&nbsp;&nbsp;</h3>
            </div>
            <div className={styles.tbd}>
              <p >{programDbState}</p>
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
            <a href={programLinkState}>{programNameState}</a>
            </div>
            <div className={styles.tbd}>
            {programLangState}
            </div>
            <div className={styles.tbd}>
            {programDbState}
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

export default ProgramDetail;