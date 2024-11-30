
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./offer.module.css";
import { getOffers } from "../../store/slices/offerSlice";
import { useEffect } from "react";

const OfferCard = () => {
  const dispatch = useDispatch();
  const {offers, } = useSelector((state)=> state.offer);
  useEffect(()=>{
    dispatch(getOffers());
  },[dispatch]);
  return (
    <section className="container mt-70">
      <h2 className={styles.heading}>Up to -40% Order.uk exclusive deals</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          992: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {offers?.map((item) => (
          <SwiperSlide key={item._id} className={styles.slide}>
            <div className={styles.card}>
                  <img
                    src={item.image}
                    alt="Deal Image"
                    className={styles.image}
                  />
              <div className={styles.cardContent}>
                <div className={styles.imageWrapper}>
                  <span className={styles.discountBadge}>-{item.discount}%</span>
                </div>
                <h3 className={styles.restaurantName}>{item.shopname}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OfferCard;
