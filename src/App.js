import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/nav";
import Home from "./views/home";
import menu from "./data/menu.json";

import "./assets/styles/reset.css";
import "./assets/styles/variables.css"; 

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Nav data={menu} />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/home" element={<Home />} exact />

        <Route element={<Home />} />
      </Routes>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
