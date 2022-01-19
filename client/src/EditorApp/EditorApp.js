import React from 'react';
import {Link} from "react-router-dom";



/* export function AddLibrary(urlOfTheLibrary, type) {
    const script = document.createElement('script');
    script.src = '../../externalApp/editor.js';
    script.type = 'text/babel';
    script.async = true;
    script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
  } */



const EditorApp = () => {
    return (
        <><div id= 'editor'>
         
        </div>
  {/*   {AddLibrary('../../externalApp/editor.js', 'text/jsx')} */}
                {/* <script type="text/babel" src="../../externalApp/editor.js"/> */}
                </>
    );
}

export default EditorApp;