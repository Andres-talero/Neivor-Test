import React, { useState, useContext } from "react";
import { createContext } from "react";

const DataContext = createContext();

const useData = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
