import "./App.css";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Grid, responsiveFontSizes } from "@mui/material";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

let initialRender = true;

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const currentUserInfo = async (token) => {
    try {
      const info = await axios.get("http://localhost:5000/users/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { username, email } = info.data;
      setUser({ username, email });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (initialRender) {
      if (token) {
        currentUserInfo(token);
        initialRender = false;
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  let routes;
  let loggedIn = user.username;

  if (!isLoading) {
    if (loggedIn) {
      routes = (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/profile"
            element={<Profile username={user.username} email={user.email} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
    }
  }

  return (
    <div className="App">
      <Navbar user={user.username} setUser={setUser} />
      {routes}
    </div>
  );
}

export default App;
