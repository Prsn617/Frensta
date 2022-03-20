import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setIsAuth(false);
    }
  });

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  return (
    <Router basename="/">
      <h1>Noooo</h1>
      <Switch>
        {!isAuth ? (
          <Route
            path="/"
            exact
            element={<Login setIsAuth={setIsAuth} />}
          ></Route>
        ) : (
          <Route
            path="/"
            exact
            element={<Home signOut={signUserOut} user={user} />}
          ></Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
