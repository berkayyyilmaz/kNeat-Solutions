import "../node_modules/react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
