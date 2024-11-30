
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./restaurant.module.css";
import { useEffect } from "react";
import { getRestaurants } from "../../store/slices/restaurantSlice";

const RestaurantsCards = () => {
  const dispatch = useDispatch();
  const {restaurants } = useSelector((state)=> state.restaurant);
  console.log(restaurants)
  useEffect(()=>{
    dispatch(getRestaurants());
  },[dispatch]);
  return (
    <section className="container mt-70">
      <h2 className={styles.heading}>Popular Restaurants</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={{
          540: { slidesPerView: 2.3 },
          640: { slidesPerView: 3.3 },
          892: { slidesPerView: 4.2 },
          1024: { slidesPerView: 5.2 },
          1120: { slidesPerView: 5.5 },
        }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {restaurants?.map((item) => (
          <SwiperSlide key={item._id} className={styles.slide}>
            <div className={styles.card}>
                <div className={styles.cardImageContainer}>
                    <img
                    src={item.logo}
                    alt={item.name}
                    className={styles.cardImage}
                    />
                </div>
              <p className={styles.cardText}>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RestaurantsCards;
