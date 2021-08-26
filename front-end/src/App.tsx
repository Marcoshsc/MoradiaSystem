import { Route, Switch, Redirect, useHistory } from "react-router-dom";
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
import ContractHandle from "./components/ContractHandle";
import Interest from "./components/Interest";
import Pendent from "./components/Pendent";

function App() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      history.push("/places");
    }
  }, [user, history]);

  return (
    <>
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
          <Route path="/contract/:idInterest">
            <ContractHandle />
          </Route>
          <Route path="/places/:id">
            <PlacePage />
          </Route>
          <Route exact path="/interest">
            <Interest />
          </Route>
          <Route exact path="/user">
            <UserPage isEdit={true} />
          </Route>
          <Route exact path="/contracts">
            <ContractPage />
          </Route>
          <Route exact path="/pendent">
            <Pendent />
          </Route>
          <Route exact path="/">
            <Redirect to="/places" />
          </Route>
        </div>
      </Switch>
    </>
  );
}

export default App;
