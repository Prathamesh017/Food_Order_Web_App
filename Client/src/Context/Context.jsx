import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Reducer } from "./Reducer";

import axios from "axios";
const userContext = createContext();

function Context({ children }) {
  const [state, dispatch] = useReducer(Reducer, {
    cart: [],
    menu: [],
  });
  useEffect(() => {
    (async () => {
      try {
        const fetchData = await axios.get(
          "https://j3tyobdhhj.execute-api.ap-south-1.amazonaws.com/"
        );

        dispatch({ type: "Fill_Cards", payload: fetchData.data.data });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, []);

  console.log(state.menu);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

const DataContext = () => {
  return useContext(userContext);
};

export default Context;
export { DataContext };
