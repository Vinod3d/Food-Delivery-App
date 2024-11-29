import { useDispatch, useSelector } from "react-redux";
import styles from "./BannerSection.module.css";
import { useEffect } from "react";
import { getImage } from "../../store/slices/imageSlice.js";
import { appStore, bannerTitle } from "../../assets/Index";

const BannerSection = () => {
  const dispatch = useDispatch();
  const { image, loading } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);
  return (
    <div className="container mt-70">
      <div className={styles.bannerContainer}>
        <div className={styles.imageContainer}>
          {loading ? (
            <div id={styles.skeleton}>
              <div className={styles.wrapper}>
                <div
                  className={`${styles.element} ${styles.box}`}
                  data-id="0"
                ></div>
              </div>
            </div>
          ) : (
            image
              .filter((img) => img.name === "couple")
              .map((img) => (
                <div key={img._id}>
                  <img
                    className={styles.image}
                    src={img.imageUrl.url}
                    alt={img.name}
                    style={{ width: "100%" }}
                  />
                </div>
              ))
          )}
        </div>

        <div className={styles.textContainer}>
            <img className={styles.bannerTitle} src={bannerTitle} alt="" />
          <p className={styles.title}>
            <span className={styles.titleHighlightOrange}>Personalised</span>{" "}
            &amp; <span className={styles.titleHighlightBlue}>Instant</span>
          </p>
          <p className={styles.description}>
            Download the Order.uk app for faster ordering
          </p>
          <div className={styles.appStore}>
            <img src={appStore} alt="" style={{ width: "100%" }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
