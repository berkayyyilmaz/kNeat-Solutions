import "../node_modules/react-toastify/dist/ReactToastify.css";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
function App() {
  return (
    <>
      <Header></Header>
      <PageContent></PageContent>
    </>
  );
}

export default App;
