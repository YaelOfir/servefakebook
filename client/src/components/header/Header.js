import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "../styles/Header.module.scss";
function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" /> {user.name}{" "}
          <i className="fas fa-angle-down"></i>
        </Link>

        <ul className="dropdown">
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <header>
      <div>
        <p>
          <Link to="/">fakebook</Link>
        </p>
      </div>
      <nav
        className={`${classes.header__content__nav} ${
          menuOpen && size.width < 768 ? classes.isMenu : ""
        }`}
      >
        <ul>
          <li>
            <Link to="/profile/" onClick={menuToggleHandler}>
              Profile
            </Link>
          </li>
        </ul>
        <ul style={transForm}>
          <li>
            <Link to="/user">
              <i className="fa fa-info"></i> User
            </Link>
          </li>
          {isLogged ? (
            userLink()
          ) : (
            <li>
              <Link to="/login">
                <i className="fas fa-user"></i> Sign in
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={classes.header__content__toggle}>
        {!menuOpen ? (
          <BiMenuAltRight onClick={menuToggleHandler} />
        ) : (
          <AiOutlineClose onClick={menuToggleHandler} />
        )}
      </div>
    </header>
  );
}

export default Header;
