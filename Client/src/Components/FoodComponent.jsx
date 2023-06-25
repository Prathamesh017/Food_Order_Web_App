import React, { useState } from "react";
import "./FoodComponent.css";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import Cards from "./Cards.jsx";
function FoodComponent() {
  const [category, setCategory] = useState(undefined);
  const changeCategory = (e) => {
    setCategory(e);
  };

  return (
    <div className="food-component">
      <FormControl className="select-element">
        <p className="category-title">Select Category</p>
        <InputLabel id="select-label" className="select-label"></InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select"
          label="Category"
          className="select-label"
          onChange={(e) => changeCategory(e.target.value)}
        >
          <MenuItem value={"Shakes"}>Shakes</MenuItem>
          <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"Lunch"}>Lunch</MenuItem>
          <MenuItem value={"Dinner"}>Dinner</MenuItem>
          <MenuItem value={"All"}>All</MenuItem>
        </Select>
      </FormControl>

      <Cards category={category}></Cards>
    </div>
  );
}

export default FoodComponent;
