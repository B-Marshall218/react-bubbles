import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from 'semantic-ui-react'
import { axiosWithAuth } from "../Utils/axiosWithAuth";


const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log("login res: ", res)
        localStorage.setItem("token", res.data.payload);
        setCredentials({
          username: "",
          password: ""
        });
        props.history.push("/bubbles")

      })
      .catch(err => console.log(err));
  }


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className="LoginForm">

      <Form onSubmit={login}>
        <h2>Log in</h2>
        <input className="insert"
          placeholder='username'
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange} />

        <input className="insert"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

export default Login;
