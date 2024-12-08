import styles from "./cart.module.css";
import { FiShare2 } from "react-icons/fi";
import { BiBasket } from "react-icons/bi";
import { MdDeliveryDining, MdStorefront } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../../store/slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const discount = 30;
  const deliveryFee = 10;
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    console.log(productId);
    dispatch(removeFromCart(productId));
  };

  const handleShare = () => {
    console.log("Share cart");
  };

  const handleCopyLink = () => {
    console.log("Copy link");
  };

  const calculateTotal = () => {
    return cart.items
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const MINIMUM_ORDER_VALUE = 200;
  const cartTotal = calculateTotal();

  const isEligibleForCheckout = cartTotal >= MINIMUM_ORDER_VALUE;
  const additionalAmountRequired = (MINIMUM_ORDER_VALUE - cartTotal).toFixed(2);
  const deliveryStartsAt = "18:00";

  const handleHover = () => {
    setHovered(true);
  };
  const handleHoverLeave = () => {
    setHovered(false);
  };

  const handleCheckout = () => {
    const total = calculateTotal() - discount + deliveryFee; 
    navigate("/checkout", { state: {cart, total } });
  };

  return (
    <div className={styles.cartContainer}>
      <button className={styles.shareButton} onClick={handleShare}>
        <div>
          <FiShare2 /> Share this cart with your friends
        </div>
        <span className={styles.copyLink} onClick={handleCopyLink}>
          Copy link
        </span>
      </button>

      <div className={styles.basketHeader}>
        <BiBasket size={24} /> My Basket
      </div>

      <div className={styles.cartItems}>
        {cart?.items.map((item) => (
          <div className={styles.cartItem} key={item._id}>
            <div className={styles.itemInfo}>
              <span className={styles.quantity}>{item.quantity}x</span>
              <div className={styles.itemDetails}>
                <span className={styles.price}>₹120</span>
                <h3>{item?.product.name}</h3>
                <p>With extra fries</p>
              </div>
            </div>
            <div
              className={styles.itemActions}
              onClick={() => handleRemove(item.product._id)}
            >
              <MdDeleteForever
                style={{
                  fontSize: "25px",
                  marginLeft: 8,
                  cursor: "pointer",
                  color: "#ff0000",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Sub Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Discounts:</span>
          <span>-₹{discount}.00</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Delivery Fee:</span>
          <span>₹{deliveryFee}.00</span>
        </div>
      </div>

      <div className={styles.total}>
        <span>Total to pay</span>
        <span className={styles.finalAmount}>
          ₹{(calculateTotal() - discount + deliveryFee) <= 0 ? '0' : calculateTotal() - discount + deliveryFee}
        </span>
      </div>

      <button className={styles.actionButton}>
        Choose your free item...{" "}
        <BsFillArrowDownCircleFill
          style={{ color: "#949494", fontSize: "20px" }}
        />
      </button>

      <button className={styles.actionButton}>
        Apply Coupon Code here{" "}
        <BsFillArrowRightCircleFill
          style={{ color: "#028643", fontSize: "20px" }}
        />
      </button>

      <div className={styles.deliveryOptions}>
        <div className={styles.deliveryOption}>
          <MdDeliveryDining style={{ color: "#028643", fontSize: "30px" }} />
          <div>Delivery</div>
          <small>Starts at 17:50</small>
        </div>
        <div className={styles.deliveryOption}>
          <MdStorefront style={{ color: "#028643", fontSize: "30px" }} />
          <div>Collection</div>
          <small>Starts at 16:55</small>
        </div>
      </div>

      <div
        className={styles.checkoutContainer}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
      >
        {!isEligibleForCheckout ? (
          <div className={styles.messageContainer}>
            <button
              className={`${styles.checkoutButton} ${styles.disabled}`}
              disabled
            >
              <BsFillArrowRightCircleFill
                style={{ color: "#fff", fontSize: "20px" }}
              />
              Checkout!
            </button>
            <p
              className={styles.message}
              style={{ display: hovered ? "block" : "none" }}
            >
              <GoAlertFill className={styles.msgIcon} />
              Minimum delivery is ₹
              <span className={styles.highlight}>{MINIMUM_ORDER_VALUE}</span>,
              You must spend ₹{additionalAmountRequired} more for the checkout!
            </p>
          </div>
        ) : (
          <div className={styles.messageContainer}>
            <button className={`${styles.checkoutButton} ${styles.active}`} onClick={handleCheckout}>
              <BsFillArrowRightCircleFill
                style={{ color: "#fff", fontSize: "20px" }}
              />
              Checkout!
            </button>
            <p className={styles.message}>
              <GoAlertFill className={styles.msgIcon} />
              We are open now, but delivery starts at{" "}
              <span className={styles.highlight}>{deliveryStartsAt}.</span>{" "}
              however you may order and collect in store now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
