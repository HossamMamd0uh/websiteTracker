import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

const API = process.env.REACT_APP_API;

export const UsersRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const nameInput = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }); 

    setName("");
    setEmail("");
    setPassword("");
    nameInput.current.focus();
    // history.push({ pathname: '/' });
    
  };





  useEffect(() => {

  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            Signup
          </button>
          <br></br>
          <Link to="/"><button className="btn btn-primary btn-block">
            Login
          </button></Link>
        </form>
      </div>
    </div>
  );
};
