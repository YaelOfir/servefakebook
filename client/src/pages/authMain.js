import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../helpers/NotFound";

import ForgotPass from "../pages/auth/ForgotPassword";
import ResetPass from "../pages/auth/ResetPassword";

import User from "./user/User";
import EditUser from "./user/EditUser";

import Home from "../pages/home/Home";
import Profile from "../pages/profile/profile";
import { useSelector } from "react-redux";

function AuthMain() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  const ifLogged = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <Login />;
  };

  const ifRegistered = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <Register />;
  };

  const ifForgotPassword = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <ForgotPass />;
  };

  const ifResetToken = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <ResetPass />;
  };

  const enterUser = () => {
    if (isLogged) {
      return <User />;
    }
    return <NotFound />;
  };

  const ifAdmin = () => {
    if (isAdmin) {
      return <EditUser />;
    }
    return <NotFound />;
  };

  const feed = () => {
    if (isLogged) {
      return <Profile />;
    }
    return <NotFound />;
  };

  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/login" element={ifLogged()} />
        <Route path="/register" element={ifRegistered()} />

        <Route path="/forgot_password" element={ifForgotPassword()} />
        <Route path="/user/reset/:token" element={ifResetToken()} />

        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
        />

        <Route path="/user" element={enterUser()} />
        <Route path="/edit_user/:id" element={ifAdmin()} />

        <Route path="/profile" element={feed()}></Route>
      </Routes>
    </section>
  );
}

export default AuthMain;
