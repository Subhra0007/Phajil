//pages/HomeSection.jsx
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import Features from "../components/Home/Features";
import NewArrivals from "../components/Home/NewArrivals";
import Trending from "../components/Home/Trending";
import Testimonials from "../components/Home/Testimonials";
function HomeSection(){
      return(
            <>
            <Hero />
            <Categories />
            <Features />
            <NewArrivals />
            <Trending/>
            <Testimonials />
            </>
      );
};

export default HomeSection;