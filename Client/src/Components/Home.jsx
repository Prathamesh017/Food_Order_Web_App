import React from 'react'
import FoodComponent from './FoodComponent.jsx'
import Sidebar from './Sidebar.jsx'
import "./Home.css";
function Home() {
  return (
    <div className="home">
        <Sidebar></Sidebar>
        <FoodComponent></FoodComponent>
    </div>
  )
}

export default Home