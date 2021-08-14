import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import PlacePage from "./components/PlacePage";
import Login from "./components/Login";
import PlacesList from "./components/PlacesList";
import "./styles/globals.scss";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/places">
            <PlacesList />
          </Route>
          <Route path="/places/:id">
            <PlacePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/places" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
