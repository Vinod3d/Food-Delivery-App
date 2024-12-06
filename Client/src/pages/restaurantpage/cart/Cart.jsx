import styles from "./cart.module.css";
import { FiShare2, FiShoppingBag, FiX, FiPlus } from "react-icons/fi";
import { BiBasket } from "react-icons/bi";
import { MdDeliveryDining, MdStorefront } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart, removeFromCart } from "../../../store/slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const discount = 30;
  const deliveryFee = 10;

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemove = (productId) => {

    console.log(productId)
    dispatch(removeFromCart(productId));
  };

  const handleShare = () => {
    console.log("Share cart");
  };

  const handleCopyLink = () => {
    console.log("Copy link");
  };

  const calculateTotal = () => {
    return cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
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

            {
                cart?.items.map((item)=>(
                    <div className={styles.cartItem} key={item._id}>
                        <div className={styles.itemInfo}>
                            <span className={styles.quantity}>{item.quantity}x</span>
                            <div className={styles.itemDetails}>
                              <span className={styles.price}>₹120</span>
                              <h3>{item?.product.name}</h3>
                              <p>With extra fries</p>
                            </div>
                        </div>
                        <div className={styles.itemActions} onClick={() => handleRemove(item.product._id)}>
                            <MdDeleteForever  style={{fontSize: '25px', marginLeft: 8, cursor: "pointer", color: "#ff0000" }} />
                        </div>
                    </div>
                ))
            }
            

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
        <span className={styles.finalAmount}>₹{(calculateTotal()-discount)+deliveryFee}</span>
      </div>

      <button className={styles.actionButton}>
        <FiShoppingBag /> Choose your free item...
      </button>

      <button className={styles.actionButton}>
        <FiPlus /> Apply Coupon Code here
      </button>

      <div className={styles.deliveryOptions}>
        <div className={styles.deliveryOption}>
          <MdDeliveryDining size={24} />
          <div>Delivery</div>
          <small>Starts at 17:50</small>
        </div>
        <div className={styles.deliveryOption}>
          <MdStorefront size={24} />
          <div>Collection</div>
          <small>Starts at 16:55</small>
        </div>
      </div>

      <button className={styles.checkoutButton}>Checkout!</button>
    </div>
  );
}

export default Cart;
