import styles from "./restaurant.module.css";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";
import RestaurantsCards from "../../components/restaurantCards/RestaurantsCards";
import CustomerReviews from "../../components/reivew/CustomerReviews";
import LocationMap from "../../components/map/LocationMap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurantById } from "../../store/slices/restaurantSlice.js";
import RestaurantHeader from "./restaurantHeader/RestaurantHeader.jsx";
import TimingSection from "./timing/TimingSection.jsx";
import { getOffers } from "../../store/slices/offerSlice.js";
import { getCategoryByRestaurantId } from "../../store/slices/categorySlice.js";
import { getItemsByRestaurant } from "../../store/slices/itemSlice.js";
import { BsPlusCircleFill } from "react-icons/bs";
import { addToCart } from "../../store/slices/cartSlice.js";
import Cart from "./cart/Cart.jsx";

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { offers } = useSelector((state) => state.offer);
  const { categories } = useSelector((state) => state.category);
  const { items } = useSelector((state) => state.item);

  console.log(categories);
  console.log(offers);
  console.log(items);

  useEffect(() => {
    const restaurantId = "67494b84ebaef9e2d17b7e3c";
    dispatch(getOffers());
    dispatch(getRestaurantById(restaurantId));
    dispatch(getCategoryByRestaurantId(restaurantId));
    dispatch(getItemsByRestaurant(restaurantId));
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <>
      <Navbar />
      <RestaurantHeader restaurant={restaurant} />
      <div className="container">
        <div className={styles.cardGroup}>
          <div className={styles.categoryContainer}>
            <div className={styles.dealsCard}>
              <div className={styles.dealsCardContainer}>
                {offers?.map((item) => (
                 
                    <div key={item._id} className={styles.card}>
                      <img
                        src={item.image}
                        alt="Deal Image"
                        className={styles.image}
                      />
                      <div className={styles.cardContent}>
                        <div className={styles.imageWrapper}>
                          <span className={styles.discountBadge}>
                            -{item.discount}%
                          </span>
                        </div>
                        <h3 className={styles.restaurantName}>
                          {item.shopname}
                        </h3>
                        <p className={styles.description}>{item.description}</p>
                      </div>
                    </div>
                  
                ))}
              </div>
            </div>

            <div className={styles.CategoryCards}>
              {categories.map((category) => {
                return (
                  <div key={category._id} className={styles.categoryItem}>
                    <h2>{category.name}</h2>

                    <div className={styles.ItemContainer}>
                      {items
                        .filter((item) => item?.category?._id === category._id)
                        .map((item) => {
                          return (
                            <div key={item._id} className={styles.ItemCard}>
                              <div className={styles.content}>
                                <h3 className={styles.title}>{item.name}</h3>
                                <p className={styles.description}>
                                  {item.description}
                                </p>
                                <div className={styles.price}>
                                  ₹{item.price}
                                </div>
                              </div>
                              <div className={styles.imageContainer}>
                                <img
                                  src={
                                    item.image ||
                                    "https://via.placeholder.com/100"
                                  }
                                  alt={item.name || "Item"}
                                  className={styles.image}
                                />
                              </div>
                              <button className={styles.addToCartButton} onClick={() => handleAddToCart(item._id)}>
                              <BsPlusCircleFill />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.cart}>
            <Cart/>
          </div>
        </div>
      </div>
      <TimingSection />
      <LocationMap />
      <CustomerReviews />
      <RestaurantsCards />
      <Footer />
    </>
  );
};

export default RestaurantPage;
