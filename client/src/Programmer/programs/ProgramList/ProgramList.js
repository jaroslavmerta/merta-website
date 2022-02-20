import React from "react";
import { Link } from 'react-router-dom';
import { ApiDelete } from '../../../common/Api';
import styles from './ProgramList.module.scss'

const ProgramList = (props) => {
  const logged = props.logged;

  const deletee = (id) => {
    ApiDelete("/api/program/" + id)
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
      <ul >
        {logged &&
          <Link to={'/program/create'} className="text-edit anch_bttn">Nový program</Link>}

        {props.items.map((item, index) => (
            
          <li key={index+1} >
            <Link to={"/program/show/" + item._id} >{item.name}</Link>

            {logged &&
            <>
            <Link to={'/program/edit/' + item._id} className="text-edit anch_bttn"> Upravit </Link>
            <button onClick={deletee.bind(this, item._id)} className="text-danger"> Odstranit </button>
            </>
            }
          
          </li>
        ))}

      </ul>
    </div>
  );
};

export default ProgramList;