import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import AuthMain from "./pages/authMain";
import axios from "axios";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post(
          "http://localhost:5000/user/refresh_token",
          null
        );
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch(dispatchLogin());

        const res = await fetchUser(token);
        dispatch(dispatchGetUser(res));
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Layout>
          <AuthMain />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
