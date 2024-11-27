import { useDispatch, useSelector } from 'react-redux'
import styles from './hero.module.css'
import { getImage } from '../../store/slices/imageSlice.js';
import { useEffect } from 'react';

const HeroImg = () => {
    const dispatch = useDispatch();
    const {image, loading } = useSelector((state)=>state.image);
    console.log(image)

    useEffect(()=>{
        dispatch(getImage("hero"));
    },[dispatch]);
  return (
    <div className='container'>
        <section className={styles.heroContainer}>
            {/* <div className={styles.grid}> */}
                <div className={styles.heroTextContainer}>
                    <p className={styles.heroText}>Order Restaurant food, takeaway and groceries.</p>
                    <h1 className={styles.heroTitle}>
                        Feast Your Senses,<br />
                        <span className={styles.heroHighlight}> Fast and Fresh</span>
                    </h1>
                    <p className={styles.heroText}>
                    Enter a postcode to see what we deliver
                    </p>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder='e.g. EC4R 3TE'/>
                        <button>Search</button>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    {
                        loading ? (
                            <div id={styles.skeleton}>
                                <div className={styles.wrapper}>
                                <div className={`${styles.element} ${styles.box}`} data-id="0"></div>

                            </div>
                            </div>
                        ) : ( image &&
                            image.filter((img) => img.name === 'hero').map((img) => (
                                <div key={img._id}>
                                    <img 
                                        className={styles.image}
                                        src={img.imageUrl.url} 
                                        alt={img.name} 
                                        style={{ width: "100%" }} 
                                    />
                                </div>
                            ))
                        )
                    }
                </div>
            {/* </div> */}
        </section>
    </div>
  )
}

export default HeroImg

