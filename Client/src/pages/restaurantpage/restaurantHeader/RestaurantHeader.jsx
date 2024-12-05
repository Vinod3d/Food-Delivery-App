"use client";

import { FiClock, FiStar } from "react-icons/fi";
import { MdDeliveryDining, MdShoppingBag } from "react-icons/md";
import styles from "./RestaurantHeader.module.css";

export default function RestaurantHeader(restaurant) {
    const data = restaurant?.restaurant;
    console.log(data)
  return (
    <div className="container">
      <div className={styles.restaurantContainer} style={{backgroundImage: `url(${data?.bannerImage})`}}>
        <div className={styles.innerContainer}>
          <div className={styles.content}>
            {/* Left Content */}
            <div className={styles.leftContent}>
              <div>
                <div className={styles.tagline}>{"I'm lovin' it!"}</div>
                <h1 className={styles.title}>{"McDonald's East London"}</h1>
              </div>

              {/* Info Pills */}
              <div className={styles.infoPills}>
                <div className={styles.pill}>
                  <MdShoppingBag size={20} />
                  <span>Minimum Order: 12 GBP</span>
                </div>
                <div className={styles.pill}>
                  <MdDeliveryDining size={20} />
                  <span>Delivery in 20-25 Minutes</span>
                </div>
              </div>
            </div>

            {/* Right Content - Rating Card */}
            <div className={styles.ratingCard}>
              <div className={styles.imageContainer}>
                <img
                  src={data?.bannerImage}
                  alt="McDonald's Burger and Fries"
                  className={styles.image}
                />
                <div className={styles.ratingOverlay}>
                  <div className={styles.ratingContent}>
                    <span className={styles.rating}>3.4</span>
                    <div className={styles.stars}>
                      {[1, 2, 3].map((star) => (
                        <FiStar
                          key={star}
                          size={20}
                          color="#FBBF24"
                          fill="#FBBF24"
                        />
                      ))}
                      {[4, 5].map((star) => (
                        <FiStar key={star} size={20} color="#D1D5DB" />
                      ))}
                    </div>
                  </div>
                  <div className={styles.reviewCount}>1,360 reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={styles.statusBadge}>
            <FiClock size={16} />
            <span>Open until 3:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
