import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { UsersRegister } from "./components/Users";
import { UsersLogin } from "./components/UserLogin";
import { Websites } from "./components/website"

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Switch>
          <Route path="/websites" component={Websites} />
          <Route path="/register" component={UsersRegister} />
          <Route path="/" component={UsersLogin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
