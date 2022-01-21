import React, { useState, useEffect } from "react";
import {

  Route,
  useNavigate,
  Navigate,
  Routes,
  useLocation,
  Link
} from "react-router-dom";
import Programmer from './Programmer/Programmer';
import WebCreator from './WebCreator/WebCreator';
import MusicMaker from './MusicMaker/MusicMaker';
import Header from './Header/Header';
//scss
import styles from './App.module.scss';

import Home from './Home/Home';
import EditorApp from './EditorApp/EditorApp';
import LoginPage from './auth/Login';
import RegisterPage from './auth/Register';
import ArticleIndex from './Blog/articles/ArticleIndex';
import ArticleDetail from './Blog/articles/ArticleDetail/ArticleDetail';
import ArticleForm from './Blog/articles/ArticleForm';
import WebPageIndex from './WebCreator/webPages/WebPageIndex';
import WebPageForm from './WebCreator/webPages/WebPageForm';
import WebPageDetail from './WebCreator/webPages/WebPageDetail/WebPageDetail';
require('./buttons.scss');



require('./cssReset.scss');

const App = () => {
  
  const location = useLocation();
  const urlHome = location.pathname === "/home";

  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);

  const loadId = () => {
    const islogin = localStorage.getItem("is-login");
   
      setloggedIn(islogin);
      if (islogin === true) {
        navigate("/writer");
          
      }
  };

  const logOut = () => {
    localStorage.setItem("is-login", "false");
    const islogin = localStorage.removeItem("is-login");
      setloggedIn(islogin);
  };

  useEffect(() => {
      loadId();
    
  }, [loggedIn]);
  
  return (
    
    <div className={styles.appContainer}>
      <div className={styles.app}>
      
      { !urlHome && <Header urlHome={urlHome}/>}
      
      <nav className="">
          {loggedIn &&
           (
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item" onClick={logOut}>
                      <Link to={"#"} className="nav-link">
                          Odhlásit se
                      </Link>
                  </li>
              </ul>
          )}
      </nav>

      <Routes>

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />

        
        <Route path="/article/show/:id" element={<ArticleDetail/>} />
        <Route path="/article/create" element={<ArticleForm/>} />
        <Route path="/article/edit/:id" element={<ArticleForm/>} />

        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/programmer" element={<Programmer/>} />
        <Route path="/programmer/editor" element={<EditorApp/>} />

        <Route path="/webpage/edit/:id" element={<WebPageForm/>} />
        <Route path="/webpage/show/:id" element={<WebPageDetail/>} />
        <Route path="/webpage/create" element={<WebPageForm/>} />
        <Route path="/webmaker" element={<WebPageIndex
          logged = {loggedIn}/>} />
        <Route path="/writer" element={<ArticleIndex 
          logged = {loggedIn}/>} />
        <Route path="/musicmaker" element={<MusicMaker/>} />
      </Routes>
        

      </div>
    </div>
  );
}

export default App;