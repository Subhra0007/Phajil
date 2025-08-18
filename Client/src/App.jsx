import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomeSection from "./pages/HomeSection";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <div>
      <Navbar />
      <HomeSection />
      <AboutUs />
      <Blog />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
