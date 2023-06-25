import React from 'react'
import Cart from './Components/Cart.jsx';
import Home from './Components/Home.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./style.css";

function App() {
  return (
    <div className='app'>
     <BrowserRouter>
        <Routes>
            <Route index element={ <Home></Home>} ></Route>
            <Route path="cart" element={<Cart></Cart>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  
  )
}


export default App
