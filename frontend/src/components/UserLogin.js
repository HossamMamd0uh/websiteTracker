import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

const API = process.env.REACT_APP_API;

export const UsersLogin = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  const handleSubmit = (e) => {
    e.preventDefault();

    const getToken = fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, })
    }).then(function (response) {
      return response.json()
    }
    ).then(function (data) {
      if (data.token){
        console.log("token is here")
        history.push({ pathname: '/websites' });
      }
      else {
        alert("Check your email or password")
        history.push({ pathname: '/' });
      }
    })

    const printToken = () => {
      getToken.then((a) => {
        console.log(a)
      })
    };

   
    // const json = await JSON.parse(res)
    // console.log(json)

    setEmail("");
    setPassword("");

    // history.push({ pathname: '/websites' });
  };
    

    useEffect(() => {
        
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={handleSubmit} className="card card-body">
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
                        Login
                    </button>
                    <br></br>
			<br></br>
			<br></br>
                    <Link to="/register"><button className="btn btn-primary btn-block">
                        Signup
                    </button></Link>
                </form>
            </div>

        </div>
    );
};
