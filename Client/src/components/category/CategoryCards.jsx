import styles from './category.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUniqeCategories } from '../../store/slices/categorySlice';


const CategoryCards = () => {
    const dispatch = useDispatch();
    const {categories } = useSelector((state)=> state.category);
    useEffect(()=>{
      dispatch(getUniqeCategories());
    },[dispatch]);


  return (
    <section className="container mt-70 mb-70">
      <h2 className={styles.header}>Order.uk Popular Categories</h2>
      <div className={styles.grid}>
        {categories?.map((category) => (
          <div key={category.name} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardImageContainer}>
                <img
                  src={category.icon}
                  alt={category}
                  className={styles.cardImage}
                />
              </div>
              <p className={styles.cardText}>{category.name}</p>
              <p className={styles.cardSubText}>{category.restaurantCount} restaurants</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
