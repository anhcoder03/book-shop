import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

const slideImages = [
  {
    url: "https://dinhtibooks.com.vn/images/banners/large/slide4_1664983950.webp",
  },
  {
    url: "https://dinhtibooks.com.vn/images/banners/large/1600x500_1678414185.webp",
  },
  {
    url: "https://dinhtibooks.com.vn/images/banners/large/slide5_1664983961.webp",
  },
  {
    url: "https://dinhtibooks.com.vn/images/banners/large/1600x500-1_1678414497.webp",
  },
];
const Slider = () => {
  return (
    <section className="banner page-container mb-16 overflow-hidden">
      <Swiper
        grabCursor="true"
        slidesPerView={"auto"}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slideImages.length > 0 &&
          slideImages.map((item) => (
            <SwiperSlide key={item.url}>
              <img src={item.url} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Slider;
