import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Items from "./components/Items";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/test").then((res) => {
      setItems(res.data);
      setFilteredItems(res.data);
    });
  }, []);

  function handleFilter(type) {
    if (!type) setFilteredItems(items);
    else setFilteredItems(items.filter((item) => item.type === type));
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main id="main">
        <Sidebar onClickHandler={handleFilter} />
        <Items items={filteredItems} />
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
