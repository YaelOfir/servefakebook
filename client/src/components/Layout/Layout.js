import React from "react";
import Header from "../header/Header";

import classes from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Layout;
