import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Items from "./components/Items";

export const ItemsContext = React.createContext();

const API_URL = "http://localhost:5000/api/users/test";
const server = axios.create({ baseURL: API_URL });

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchItems = async () => {
    const response = await server.get("/");
    setItems(response.data);
    setFilteredItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main id="main">
        <ItemsContext.Provider
          value={{
            state1: [items, setItems],
            state2: [filteredItems, setFilteredItems],
            fetchItems: fetchItems,
          }}
        >
          <Sidebar />
          <Items />
        </ItemsContext.Provider>
      </main>
      <footer>
        <p>
          Copyright &copy; {new Date().getFullYear()}. Created By Mohit Dhule
        </p>
      </footer>
    </>
  );
}

export default App;
