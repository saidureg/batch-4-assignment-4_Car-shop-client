import { Carousel, Row, Col } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CarOutlined,
  PhoneOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";
import { useEffect, useRef, useState } from "react";
import "./PopularBrands.css";

import hondaLogo from "../../assets/image/Honda-Logo.png";
import suzukiLogo from "../../assets/image/suzuki.png";
import mahindaLogo from "../../assets/image/Mahindra-logo.png";
import ssangyongLogo from "../../assets/image/seeklogo.com.png";
import kiaLogo from "../../assets/image/seeklogo.png";
import mazdaLogo from "../../assets/image/Mazda-logo.png";
import subaruLogo from "../../assets/image/brand-subaru-free.jpg";

const brands = [
  { name: "Honda", logo: hondaLogo },
  { name: "Suzuki", logo: suzukiLogo },
  { name: "SsangYong", logo: ssangyongLogo },
  { name: "Mahindra", logo: mahindaLogo },
  { name: "Kia Motors", logo: kiaLogo },
  { name: "Mazda", logo: mazdaLogo },
  { name: "Toyota", logo: hondaLogo },
  { name: "Subaru", logo: subaruLogo },
  { name: "Nissan", logo: suzukiLogo },
];

const PopularBrands = () => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [slidesToShow, setSlidesToShow] = useState(5);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(5);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  return (
    <div className="brands-section">
      <h2 className="section-title">
        POPULAR <span className="text-primary">BRANDS</span>
      </h2>
      <div className="carousel-wrapper section-container">
        <LeftOutlined className="arrow left" onClick={handlePrev} />
        <Carousel
          ref={carouselRef}
          dots={false}
          slidesToShow={slidesToShow}
          autoplay
          style={{ marginLeft: "72px" }}
        >
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </div>
          ))}
        </Carousel>
        <RightOutlined className="arrow right" onClick={handleNext} />
      </div>

      <div className="features-wrapper">
        <Row gutter={[16, 16]} className="features">
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <CarOutlined className="feature-icon" />
              <h3>Sold Almost</h3>
              <p>14000+ Cars</p>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <PhoneOutlined className="feature-icon" />
              <h3>Support Center</h3>
              <p>Best Support System Onwards</p>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <SyncOutlined className="feature-icon" />
              <h3>Faster Service</h3>
              <p>You will get faster service than you imagined</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PopularBrands;
