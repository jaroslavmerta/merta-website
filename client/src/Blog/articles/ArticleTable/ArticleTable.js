import React from "react";
import { Link } from 'react-router-dom';
import { ApiDelete } from '../../../common/Api';
import styles from './ArticleTable.module.scss'

const ArticleTable = (props) => {
  const logged = props.logged;

  const deletee = (id) => {
    ApiDelete("/api/article/" + id)
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
      <ul className={styles.articleList}>

        {props.items.map((item, index) => (
            
          <li key={index+1} >
            <Link to={"/article/show/" + item._id} >{item.name}</Link>

            {logged &&
            <><Link to={'/article/edit/' + item._id} className="btn btn-sm btn-warning"> Upravit </Link>
            <button onClick={deletee.bind(this, item._id)} className="btn btn-sm btn-danger"> Odstranit </button></>
            }
          
          </li>
        ))}
      </ul>
    {logged &&
      <Link to={'/article/create'} className="btn btn-success">Nový článek</Link>}

    </div>
  );
};

export default ArticleTable;