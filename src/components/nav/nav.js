import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import logo from "../../assets/images/logo.svg";
import menuOpenIcon from "../../assets/images/menu-icon.png";
import menuClosedIcon from "../../assets/images/menu-icon-close.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import menuData from "../../data/menu.json";
import { HashLink } from "react-router-hash-link";

export default function Nav(props, passive = false) {
  const [menu, setmenu] = useState(menuData);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [page, setpage] = useState("home");
  const [currentSection, setCurrentSection] = useState(1);
  let history = useNavigate();

  useEffect(() => {
    // initiate the event handler
    //window.addEventListener("scroll", handleScroll, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //define sections' offsetTop
  const aboutTop = document.getElementById("about")
    ? document.getElementById("about").offsetTop
    : 0;
  const portfolioTop = document.getElementById("portfolio")
    ? document.getElementById("portfolio").offsetTop
    : 0;
  const contactTop = document.getElementById("contact")
    ? document.getElementById("contact").offsetTop
    : 0;

  /**
   * customize scroll callback
   */
  const handleScroll = () => {
    let idsection = 0;
    let scrollY = parseInt(window.scrollY, 10);

    if (scrollY < aboutTop) idsection = 1;

    if (scrollY >= aboutTop - 120 && scrollY < portfolioTop) idsection = 2;

    if (scrollY >= portfolioTop - 120 && scrollY < contactTop) idsection = 3;

    if (scrollY >= contactTop - 120) idsection = 4;

    //display background in sections different that home
    if (idsection === 1)
      document.getElementById("nav").classList.remove("nav-filled");
    else document.getElementById("nav").classList.add("nav-filled");

    //if page project is rendered
    let projectSection = document.getElementById("project");
    if (projectSection) {
      idsection = 3;
    }

    handlerItemMenu(null, idsection);
    activeIconTransition(idsection);
  };

  /**
   * active icon transition in each section
   * @param {*} idsection
   */
  const activeIconTransition = (idsection) => {
    if (currentSection !== idsection) {
      document.getElementById("logo").className = "nav-icon-img";
      setCurrentSection(idsection);
    }
  };

  /**
   * update the menu status
   * @param {*} e
   * @param {*} id
   * @param {*} ref
   */
  const handlerItemMenu = (e, id, ref) => {
    let oldList = menu;

    const newList = oldList.map((item) => {
      if (item.id === id) {
        let updatedItem = {
          ...item,
          isActive: true,
        };

        return updatedItem;
      } else {
        let updatedItem = {
          ...item,
          isActive: false,
        };

        return updatedItem;
      }
    });

    setmenu(newList);
    history(ref);
  };

  const items = menu.map((item, index) => {
    return (
      <div className="nav-item" key={index}>
        <HashLink
          className={item.isActive ? "nav-link-active" : "nav-link"}
          to={item.ref}
          key={index}
          onClick={(e) => {
            handlerItemMenu(e, item.id, item.ref);
          }}
        >
          <div className="nav-item-label">{item.label}</div>
          <div className="nav-item-icon">
            <FontAwesomeIcon
              icon={[item.iconFamily, item.icon]}
              key={item.id}
            />{" "}
            {item.label}
          </div>
        </HashLink>
      </div>
    );
  });

  function updatePage(page) {
    setpage(page);
    //setisMenuOpen(false);
    history.push(page);
  }

  function updateIsMenuOpen() {
    console.log(isMenuOpen);
    setisMenuOpen(!isMenuOpen);
  }

  return (
    <nav>
      <div className="menu-mobile">
        <div className="menu-mobile-logo">
          <img
            id="menu-logo"
            src={logo}
            key={currentSection}
            width="25px"
            alt="Menu"
          />
        </div>
        <div className="menu-mobile-title">Passage 22</div>
        <button className="menu-mobile-icon" onClick={updateIsMenuOpen}>
          <img
            id="menu-icon"
            src={isMenuOpen ? menuClosedIcon : menuOpenIcon}
            key={currentSection}
            width="25px"
            alt="Menu"
          />
        </button>
      </div>

      <ul
        className={
          isMenuOpen
            ? "nav-items nav-items-active"
            : "nav-items nav-items-inactive"
        }
      >
        <li
          className={page === "home" ? "nav-item active-item" : "nav-item"}
          onClick={() => updatePage("home")}
        >
          <span>THE BAND</span>
        </li>

        <li
          className={page === "neofeed" ? "nav-item active-item" : "nav-item"}
          onClick={() => updatePage("neofeed")}
        >
          <span>STORIES</span>
        </li>

        <li
          className={page === "nimages" ? "nav-item active-item" : "nav-item"}
          onClick={() => updatePage("nimages")}
        >
          <span>ALBUM</span>
        </li>

        <li
          className={page === "mrover" ? "nav-item active-item" : "nav-item"}
          onClick={() => updatePage("mrover")}
        >
          <span>CONTACT</span>
        </li>
      </ul>


      <div className="menu-desktop">
      <div className="col">
        <div className="row">
          <div className="barnav">
            <div>
              <a href="#" className="barnav-item">
                THE BAND
              </a>
            </div>
            <div>
              <a href="#" className="barnav-item">
                STORIES
              </a>
            </div>
            <div>
              <a href="#" className="barnav-item">
                ALBUM
              </a>
            </div>
            <div>
              <a href="#" className="barnav-item">
                CONTACT
              </a>
            </div>
            <div>
              <a href="#" className="barnav-item">
                CLASSIFIED
              </a>
            </div>
          </div>
          <div className="col center">
            <svg
              viewBox="0 0 300 150"
              xmlns="http://www.w3.org/2000/svg"
              width="10rem"
              height="150px"
            >
              <circle className="band-logo" cx="150" cy="75" r="40" />

              <polyline points="100,0 0,75 30,75 100,0" className="band-logo" />
              <polyline points="0,75  100,150 30,75" className="band-logo" />
              <polyline
                points="200,0 300,75 270,75 200,0"
                className="band-logo"
              />
              <polyline
                points="300,75  200,150   270,75"
                className="band-logo"
              />
            </svg>
            <h1>Passage 22</h1>
          </div>
        </div>
        <div className="unit">AB</div>
      </div>

      <div className="header-bar">
        <div>N.01</div>
        <div>FRIDAY, JANUARY 27, 2023</div>
        <div>ONLINE VERSION</div>
      </div>
    </div>

    </nav>
  );
}
