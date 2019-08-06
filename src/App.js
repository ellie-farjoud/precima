import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Home from "./home";
import ItemDetails from "./containers/itemDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Precima</h1>
        </header>
        <Route path="/" exact component={Home} />
        <Route path="/detail" exact component={ItemDetails} />
      </div>
    </Router>
  );
}

export default App;
