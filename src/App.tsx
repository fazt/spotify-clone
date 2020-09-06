import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Callback from './components/Callback'
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} exact />
      </Switch>`
    </Router>
  )
}

export default App;
