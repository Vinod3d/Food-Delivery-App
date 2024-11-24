import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";
import styles from "./footer.module.css";
import { logo2, appStore } from "../../assets/Index.js";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div className={styles.downloadSection}>
          <div className={styles.downloadLinks}>
            <Link to="#" className={styles.downloadLink}>
              <img
                src={logo2}
                alt="Download on the App Store"
                className={styles.downloadImage}
              />
            </Link>
            <Link to="#" className={styles.downloadLink}>
              <img
                src={appStore}
                alt="Get it on Google Play"
                className={styles.downloadImage}
              />
            </Link>
          </div>
          <p className={styles.companyInfo}>
          Company # 490039-445, Registered withHouse of companies.
          </p>
        </div>
        <div className={styles.newsletterGroup}>
          <h3 className={styles.newsletterHeading}>
            Get Exclusive Deals in your Inbox
          </h3>
          <form className={styles.subscribeContainer}>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className={styles.subscribeInput}
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
          <p className={styles.footerText}>
            we won&apos;t spam, read our email policy
          </p>
          <div className={styles.socialLinks}>
            <Link to="#" className={styles.footerLink}>
              <FaFacebook />
            </Link>
            <Link to="#" className={styles.footerLink}>
              <FaInstagram />
            </Link>
            <Link to="#" className={styles.footerLink}>
              <FaTiktok />
            </Link>
            <Link to="#" className={styles.footerLink}>
              <FaSnapchat />
            </Link>
          </div>
        </div>

        <div className={styles.legalLinks}>
          <h3 className={styles.newsletterHeading}>Legal Pages</h3>
          <ul>
            <li>
              <Link to="#" className={styles.footerLink}>
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Cookies
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Modern Slavery Statement
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.legalLinks}>
          <h3 className={styles.newsletterHeading}>Important Links</h3>
          <ul>
            <li>
              <Link to="#" className={styles.footerLink}>
                Get help
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Add your restaurant
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Sign up to deliver
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Create a business account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        <div className={styles.bottomFooterLinks}>
          <Link to="#" className={`${styles.footerLink}`}>
            Privacy Policy
          </Link>
          <Link to="#" className={`${styles.footerLink}`}>
            Terms
          </Link>
          <Link to="#" className={`${styles.footerLink}`}>
            Pricing
          </Link>
          <Link to="#" className={`${styles.footerLink}`}>
            Do not sell or share my personal information
          </Link>
        </div>
      </div>
    </footer>
  );
}
