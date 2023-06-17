import React from "react";
import "./App.css";
import Index from "./component/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  //render
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
