import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PlacePage from "./components/PlacePage";
import Login from "./components/Login";
import PlacesList from "./components/PlacesList";
import "./styles/globals.scss";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";
import ContractPage from "./components/ContractPage";
import Register from "./components/Register";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContenxt";
import AddPlacePage from "./components/AddPlacePage";

function App() {
  const { singIn } = useContext(AuthContext);

  useEffect(() => {
    singIn("marcos@gmail.com", "123");
  }, [singIn]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <div>
            <NavBar />

            <Route exact path="/places">
              <PlacesList />
            </Route>
            <Route exact path="/addplace">
              <AddPlacePage />
            </Route>
            <Route path="/places/:id">
              <PlacePage />
            </Route>

            <Route exact path="/user">
              <UserPage isEdit={false} />
            </Route>
            <Route exact path="/user/edit">
              <UserPage isEdit />
            </Route>
            <Route exact path="/contracts">
              <ContractPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/places" />
            </Route>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
