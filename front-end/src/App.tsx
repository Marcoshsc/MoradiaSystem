import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PlacesList from "./components/PlacesList";
import "./styles/globals.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/places">
          <PlacesList />
        </Route>
        <Route path="/">
          <Redirect to="/places" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
