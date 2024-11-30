

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./offer.module.css"; // Import CSS module

const OfferCard = () => {
  return (
    <section className="container mt-70">
      <h2 className={styles.heading}>Up to -40% Order.uk exclusive deals</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide key={item} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.imageWrapper}>
                  <img
                    src="/placeholder.svg"
                    alt="Deal Image"
                    className={styles.image}
                  />
                  <span className={styles.discountBadge}>-40%</span>
                </div>
                <h3 className={styles.restaurantName}>Restaurant Name</h3>
                <p className={styles.location}>Location</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OfferCard;
