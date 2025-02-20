import { Carousel } from "antd";
import "./Banner.css";
import banner1 from "../../assets/image/desktop-bg2.jpg";
import banner2 from "../../assets/image/desktop-bg.jpg";
import banner3 from "../../assets/image/desktop-bg3.jpg";
import bannerMobile from "../../assets/image/mobile-bg.jpg";

const Banner = () => {
  return (
    <div className="banner">
      <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3500}
        className="desktop-banner"
        dotPosition="left"
      >
        <div className="banner-slide overlay-banner">
          <img className="contentStyle" src={banner1} alt="" />
          <div className="overlay"></div>
        </div>
        <div className="banner-slide overlay-banner">
          <img className="contentStyle" src={banner2} alt="" />
          <div className="overlay"></div>
        </div>
        <div className="banner-slide overlay-banner">
          <img className="contentStyle" src={banner3} alt="" />
          <div className="overlay"></div>
        </div>
      </Carousel>
      <div className="text-content">
        <h1>Find the Best Car Price in Bangladesh</h1>
        <p>Leading online automotive marketplace in Bangladesh</p>
      </div>
      <div className="mobile-banner">
        <img
          src={bannerMobile}
          alt="Mobile Banner"
          className="contentStyle-mobile"
        />
      </div>
    </div>
  );
};

export default Banner;
