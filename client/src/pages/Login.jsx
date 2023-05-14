import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [post, setPost] = React.useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/login", user).then((response) => {
        if (user.username == response.data[0].username) {
          localStorage.setItem("userid", response.data[0].id);
          navigate("/books");
        } else {
          alert("incorrect username/password");
        }
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Login</button>
      <button className="registerButton" onClick={() => navigate("/register")}>
        Register
      </button>

      {error && "Something went wrong!"}
    </div>
  );
};

export default Login;
