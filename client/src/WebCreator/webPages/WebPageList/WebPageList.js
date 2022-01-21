import React from "react";
import { Link } from 'react-router-dom';
import { ApiDelete } from '../../../common/Api';
import styles from './WebPageList.module.scss'

const WebPageList = (props) => {
  const logged = props.logged;

  const deletee = (id) => {
    ApiDelete("/api/webPage/" + id)
        .then((data) => props.delete())
        .catch(async (error) => {
            error = await error;
            if (error.success === false) {
                alert(error.message);
            }
        });
  };

  return (
    <div>
     {logged &&  
      <p>
        {props.label} {props.items.length}
      </p>}
      <ul className={styles.webPageList}>

        {props.items.map((item, index) => (
            
          <li key={index+1} >
            <Link to={"/webPage/show/" + item._id} >{item.name}</Link>

            {logged &&
            <>
            <Link to={'/webPage/edit/' + item._id} className=""> Upravit </Link>
            <button onClick={deletee.bind(this, item._id)} className=""> Odstranit </button>
            </>
            }
          
          </li>
        ))}
      </ul>
    {logged &&
      <Link to={'/webPage/create'} className="">Nový článek</Link>}

    </div>
  );
};

export default WebPageList;