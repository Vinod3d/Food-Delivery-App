import { getOrder, orderFood, track } from "../../assets/Index";
import styles from "./about.module.css"; // Importing the CSS module

export default function AboutUs() {
  return (
    <div className="container mt-70">

        <div className={styles.aboutContainer}>
            <div className={styles.aboutHeader}>
            <h2>Know more about us!</h2>
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.active}`}>Frequent Questions</button>
                <button className={styles.tab}>Who we are?</button>
                <button className={styles.tab}>Partner Program</button>
                <button className={styles.tab}>Help & Support</button>
            </div>
            </div>
        <div className={styles.content}>
            {/* FAQ Section */}
            <div className={styles.faqSection}>
                <div className={styles.faqButtons}>
                    <button className={`${styles.btn} ${styles.primary}`}>
                    How does Order.UK work?
                    </button>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                    What payment methods are accepted?
                    </button>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                    Can I track my order in real-time?
                    </button>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                    Are there any special discounts or promotions available?
                    </button>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                    Is Order.UK available in my area?
                    </button>
                </div>
            </div>

            {/* Process Section */}
            <div className={styles.processSection}>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h3>Place an Order!</h3>
                        <img src={orderFood} alt="" />
                        <p>Place order through our website or Mobile app</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Track Progress</h3>
                        <img src={track} alt="" />
                        <p>You can track your order status with delivery time</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Get your Order!</h3>
                        <img src={getOrder} alt="" />
                        <p>Receive your order at a lightning-fast speed!</p>
                    </div>
                </div>

                <p className={styles.description}>
                    Order.UK simplifies the food ordering process. Browse through our diverse menu, select
                    your favorite dishes, and proceed to checkout. Your delicious meal will be on its way
                    to your doorstep in no time!
                </p>
            </div>
        </div>
        </div>
    </div>
  );
}
