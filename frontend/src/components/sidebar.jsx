import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FiMenu,
  FiHome,
  FiClock,
  FiMoon,
  FiSun
} from "react-icons/fi";

import "./Sidebar.css";


function Sidebar() {

  const [open, setOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {

  const newMode = !darkMode;

  setDarkMode(newMode);

  if (newMode) {

    document.body.classList.add("dark");

  } else {

    document.body.classList.remove("dark");
  }

  setOpen(false);
};


  return (

    <>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >

        <FiMenu />

      </button>


      {open && (

        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />

      )}


      <div className={open ? "sidebar open" : "sidebar"}>

        <h2 className="logo">
          Sentiment AI
        </h2>


        <Link
          to="/"
          className="sidebar-link"
          onClick={() => setOpen(false)}
        >

          <FiHome />

          <span>Home</span>

        </Link>


        <Link
          to="/history"
          className="sidebar-link"
          onClick={() => setOpen(false)}
        >

          <FiClock />

          <span>History</span>

        </Link>


        <button
          className="sidebar-link dark-toggle"
          onClick={toggleDarkMode}
        >

          {darkMode ? <FiSun /> : <FiMoon />}

          <span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>

         </button>

      </div>

    </>
  );
}

export default Sidebar;