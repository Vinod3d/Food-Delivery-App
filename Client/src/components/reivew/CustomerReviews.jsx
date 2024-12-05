/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CustomerReview.module.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { pro } from "../../assets/Index.js";

const reviews = [
  {
    id: 1,
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    content:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying.",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Doe",
    location: "North London",
    date: "20th September, 2023",
    rating: 4,
    content:
      "I loved the ambiance and quick service. Could improve on the menu variety, though!",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "John Smith",
    location: "East London",
    date: "18th September, 2023",
    rating: 3.5,
    content:
      "It was okay. The food was a bit cold, but the staff was courteous.",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Clark",
    location: "West London",
    date: "16th September, 2023",
    rating: 5,
    content: "Amazing experience! The burgers were fresh and the fries crispy!",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Emily Clark",
    location: "West London",
    date: "16th September, 2023",
    rating: 5,
    content: "Amazing experience! The burgers were fresh and the fries crispy!",
    avatar: "/placeholder.svg",
  },
];

export default function CustomerReviews() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  
  // State for Swiper initialization
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <div className={styles.review}>
      <div className={styles.reviewContainer}>
        <div className={styles.header}>
          <h2>Customer Reviews</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            // Set swiper instance on initial load
            setSwiperReady(true);
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className={styles.carousel}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.reviewCard}>
              <div className={styles.cardGroup}>
                <div className={styles.profileGroup}>
                  <img
                    src={pro}
                    alt={`${review.name}'s avatar`}
                    className={styles.avatar}
                    width={40}
                    height={40}
                  />
                  <div className={styles.nameGroup}>
                    <h4>{review.name}</h4>
                    <p className={styles.location}>{review.location}</p>
                  </div>
                </div>

                <div className={styles.dateContainer}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < review.rating
                            ? styles.activeStar
                            : styles.inactiveStar
                        }
                      />
                    ))}
                  </div>
                  <p className={styles.locationDate}>{review.date}</p>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <p className={styles.reviewText}>{review.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Ratings section */}
        <div className={styles.ratingRation}>
          <p className={styles.averageRation}>3.5</p>
          <ReactStars
            count={5}
            value={3.5} // Average rating value
            size={20}
            isHalf={true}
            edit={false}
            activeColor="#f97316"
            color="#e5e7eb"
          />
          <p className={styles.numOfReview}>
            <span>5</span> reviews
          </p>
        </div>

        {/* Custom navigation buttons */}
        <div className={styles.btnGroup}>
          <div
            ref={prevRef}
            className={`${styles.prev} ${styles.navButton}`}
            style={swiperReady ? {} : { display: "none" }} // Hide navigation buttons until Swiper is initialized
          >
            <span className={styles.navArrow}>
              <MdArrowBackIosNew className={styles.icon}/>
            </span>
          </div>
          <div
            ref={nextRef}
            className={`${styles.next} ${styles.navButton}`}
            style={swiperReady ? {} : { display: "none" }} // Hide navigation buttons until Swiper is initialized
          >
            <span className={styles.navArrow}>
              <MdArrowForwardIos className={styles.icon}/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
