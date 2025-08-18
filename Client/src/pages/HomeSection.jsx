import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import Features from "../components/Home/Features";
import NewArrivals from "../components/Home/NewArrivals";
import HomeUnisex from "../components/Home/HomeUnisex";
import Trending from "../components/Home/Trending";
import HomeNostalgic from "../components/Home/HomeNostalgic"
import Testimonials from "../components/Home/Testimonials";
function HomeSection(){
      return(
            <>
            <Hero />
            <Categories />
            <Features />
            <NewArrivals />
            <HomeUnisex/>
            <Trending/>
            <HomeNostalgic/>
            <Testimonials />
            </>
      );
};

export default HomeSection;