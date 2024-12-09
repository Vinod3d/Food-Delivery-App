import styles from "./restaurant.module.css";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";
import RestaurantsCards from "../../components/restaurantCards/RestaurantsCards";
import CustomerReviews from "../../components/reivew/CustomerReviews";
import LocationMap from "../../components/map/LocationMap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../../store/slices/restaurantSlice.js";
import RestaurantHeader from "./restaurantHeader/RestaurantHeader.jsx";
import TimingSection from "./timing/TimingSection.jsx";
import { getOffers } from "../../store/slices/offerSlice.js";
import { getCategoryByRestaurantId } from "../../store/slices/categorySlice.js";
import { getItemsByRestaurant, searchItems } from "../../store/slices/itemSlice.js";
import { BsPlusCircleFill } from "react-icons/bs";
import { addToCart, getCart } from "../../store/slices/cartSlice.js";
import Cart from "./cart/Cart.jsx";
import { useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile.jsx";
import SearchTab from "./searchTab/SearchTab.jsx";

const RestaurantPage = () => {
  const [querySearch, setQuerySearch] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { offers } = useSelector((state) => state.offer);
  const { categories } = useSelector((state) => state.category);
  const { items } = useSelector((state) => state.item);
  const cart = useSelector((state) => state.cart);
  const [isCartVisible, setIsCartVisible] = useState(false);

  console.log(querySearch)

  useEffect(() => {
    if (location.state?.toggleCart) {
      setIsCartVisible((prev) => !prev); // Toggle cart visibility
    }
  }, [location.state]);

  useEffect(() => {
    const restaurantId = "67494b84ebaef9e2d17b7e3c";
    dispatch(getOffers());
    dispatch(getRestaurantById(restaurantId));
    dispatch(getCategoryByRestaurantId(restaurantId));
    dispatch(getItemsByRestaurant(restaurantId));
  }, [dispatch, querySearch]);

  const handleAddToCart = async (productId) => {
    const result = await dispatch(addToCart(productId));
    if (result) {
      dispatch(getCart());
    }
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(false);
  };

  const handleSearch = (query)=>{
    console.log(query)
    setQuerySearch(true);
    dispatch(searchItems(query));
  }

  return (
    <>
      <Navbar toggleCart={toggleCartVisibility} />
      <RestaurantHeader restaurant={restaurant} />
      <SearchTab
        search={handleSearch}
        setQuerySearch={setQuerySearch}
      />
      <div className="container">
        <div className={styles.cardGroup}>
          <div className={styles.categoryContainer}>
            {
              querySearch ? (
                <div className={styles.CategoryCards}>
              {items?.map((item) => {
                return (
                  <div key={item._id} className={styles.categoryItem}>
                    <div className={styles.ItemContainer}>
          
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
                              <button
                                className={styles.addToCartButton}
                                onClick={() => handleAddToCart(item._id)}
                              >
                                <BsPlusCircleFill />
                              </button>
                            </div>
                    </div>
                  </div>
                );
              })}
            </div>
              ): (
                <>
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
                      <h3 className={styles.restaurantName}>{item.shopname}</h3>
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
                              <button
                                className={styles.addToCartButton}
                                onClick={() => handleAddToCart(item._id)}
                              >
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
                </>
              )
            }
            

          </div>
          <div className={styles.cart} style={{display: isCartVisible ? 'block' : 'none'}}>
            {isMobile ? (
              <div className={styles.modalOverlay} onClick={()=>setIsCartVisible(false)}>
              <div className={styles.modalContent}>
                <Cart cart={cart} />
              </div>
            </div>
            ) :(
              <Cart cart={cart} />
            )}
            
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
