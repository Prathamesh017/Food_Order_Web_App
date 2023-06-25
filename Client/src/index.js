import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.js"
import Context from './Context/Context.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Context>
        <App></App>
 </Context>


);



