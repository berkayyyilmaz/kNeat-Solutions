import "../node_modules/react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  verifyToken,
  setupAutoTokenRefresh,
} from "./redux/actions/clientActions";
import useScrollToTop from "./hooks/useScrollToTop";

import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Shop from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrderAddressPage from "./pages/OrderAddressPage";

// Router içinde kullanılacak ana app component'i
function AppContent() {
  const dispatch = useDispatch();

  // Scroll to top hook'unu kullan
  useScrollToTop();

  useEffect(() => {
    //  Uygulama başladığında güvenli token doğrulama
    import("./utils/secureStorage").then(({ default: SecureStorage }) => {
      const token = SecureStorage.getToken();
      if (token) {
        dispatch(verifyToken())
          .then(() => {
            //  Token geçerliyse auto refresh setup yap
            dispatch(setupAutoTokenRefresh());
          })
          .catch(() => {
            // Hata varsa sessizce geç, kullanıcıyı rahatsız etme
          });
      }
    });
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          component={Shop}
        />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cart" component={CartPage} />
        <ProtectedRoute path="/order/address" component={OrderAddressPage} />
      </Switch>
      <ScrollToTop />
    </>
  );
}

// ProtectedRoute bileşeni
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = SecureStorage.getToken(); // Token var mı kontrol et
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
