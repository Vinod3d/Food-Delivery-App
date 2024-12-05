
import styles from './timing.module.css';
import { contact, delivery, timing } from '../../../assets/Index.js';

export default function TimingSection() {
  return (
    <div className='container'>

        <div className={styles.timingContainer}>
        <div className={`${styles.timingCard} ${styles.delivery}`}>
            <h2><img src={delivery} alt="" style={{width: '22px'}}/> Delivery information</h2>
            <div className={styles.timingList}>
            <div className={styles.timingItem}>
                <span>Monday:</span>
                <span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Tuesday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Wednesday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Thursday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Friday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Saturday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Sunday:</span>
                <span>8:00 AM–12:00 AM</span>
            </div>
            <div className={`${styles.timingItem} ${styles.estimated}`}>
                <span>Estimated time until delivery:</span>
                <span>20 min</span>
            </div>
            </div>
        </div>

        <div className={`${styles.timingCard} ${styles.contact}`}>
            <h2><img src={contact} alt="" style={{width: '22px'}}/> Contact information</h2>
            <p className={styles.allergyInfo}>
            If you have allergies or other dietary restrictions, please contact the restaurant. The
            restaurant will provide food-specific information upon request.
            </p>
            <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
                <span>Phone number</span>
                <span>+934443-43</span>
            </div>
            <div className={styles.contactItem}>
                <span>Website</span>
                <a href="http://mcdonalds.uk/" target="_blank" rel="noopener noreferrer">
                http://mcdonalds.uk/
                </a>
            </div>
            </div>
        </div>

        <div className={`${styles.timingCard} ${styles.operational}`}>
            <h2><img src={timing} alt="" style={{width: '22px'}}/> Operational Times</h2>
            <div className={styles.timingList}>
            <div className={styles.timingItem}>
                <span>Monday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Tuesday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Wednesday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Thursday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Friday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Saturday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            <div className={styles.timingItem}>
                <span>Sunday:</span>
                <span>8:00 AM–3:00 AM</span>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
