import { IoArrowBack, IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "./checkout.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";
import RestaurantsCards from "../../components/restaurantCards/RestaurantsCards";
import Footer from "../../components/footer/Footer";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total } = location.state || { cart: {}, total: 0 };
  const totalAmount = total || 0;
  const salesTax = 10;
  const finalAmount = totalAmount + salesTax;

  const handlePayment = () => {
    navigate("/payment", { state: { cart, finalAmount } });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backButton}>
            <IoArrowBack size={24} onClick={() => navigate(-1)} />
          </button>
          <h1 className={styles.headTitle} style={{ fontSize: "20px" }}>
            Your Order Details
          </h1>
        </header>
        <div className={styles.checkoutContainer}>
          <div className={styles.left}>
            <div className={styles.orderList}>
              {cart?.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img
                    src={item.product.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.product.name}</div>
                    <div className={styles.itemQuantity}>
                      {item.quantity} item
                    </div>
                  </div>
                  <div className={styles.itemPrice}>₹{item.product.price}</div>
                </div>
              ))}
              <label htmlFor="">Note</label>
              <input
                type="text"
                placeholder="Add order notes..."
                className={styles.noteInput}
              />
            </div>
          </div>

          <div className={styles.right}>
            <div
              className={styles.deliverySection}
              onClick={() => navigate("/address")}
            >
              <div className={styles.deliveryHeader}>
                <div className={styles.deliveryDetails}>
                  <IoLocationOutline className={styles.locationIcon} />
                  <div className={styles.addressGroup}>
                    <div className={styles.title}>Delivery Address</div>
                    <div className={styles.deliveryAddress}>
                      15 Street Smart, Sector 12
                    </div>
                  </div>
                </div>
                <MdKeyboardArrowRight size={24} style={{ color: "#FC8A06" }} />
              </div>
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  {cart?.items.length} items
                </span>
                <span className={styles.summaryValue}>₹{totalAmount}</span>
              </div>
              <div
                className={styles.summaryRow}
                style={{ borderBottom: "1px solid black" }}
              >
                <span className={styles.summaryLabel}>Sales Tax</span>
                <span className={styles.summaryValue}>₹{salesTax}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  Subtotal ({cart?.items.length} items)
                </span>
                <span className={styles.total}>₹{finalAmount}</span>
              </div>
              <button className={styles.paymentButton} onClick={handlePayment}>
                Choose Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
      <RestaurantsCards />
      <Footer />
    </>
  );
}
