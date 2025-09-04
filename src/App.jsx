import "../node_modules/react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "./redux/actions/clientActions";

import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Shop from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama başladığında token varsa sessizce doğrula
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(verifyToken()).catch(() => {
        // Hata varsa sessizce geç, kullanıcıyı rahatsız etme
        console.log("Token doğrulama başarısız");
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          component={Shop}
        />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
      <ScrollToTop />
    </Router>
  );
}

export default App;
