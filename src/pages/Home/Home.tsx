import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import AppFooter from "../../components/Footer/Footer";
import Banner from "../../components/Header/Banner";
import PopularBrands from "../../components/PopularBrands/PopularBrands";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <WelcomeSection />
      <PopularBrands />
      <AppFooter />
    </div>
  );
};

export default Home;
