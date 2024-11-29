import { useDispatch, useSelector } from 'react-redux';
import styles from './CardSection.module.css';
import { useEffect } from 'react';
import { getImage } from '../../store/slices/imageSlice';

const CardSection = () => {
  const dispatch = useDispatch()
  const {image } = useSelector((state)=>state.image);
  const card1 = image.find(img => img.name === 'card1')
  const card2 = image.find(img => img.name === 'card2')

  const cards = [
    {
      id: 1,
      title: "Partner with us",
      subtitle: "Signup as a business",
      description: "Earn more with lower fees",
      buttonText: "Get Started",
      imageUrl: card1 ? card1.imageUrl.url :
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ZJVlov_JoiTi4y4Z5WgAdKlgZu1tNRQ9Iw&s", 
      bgColor: styles.bgGray900,
    },
    {
      id: 2,
      title: "Ride with us",
      subtitle: "Signup as a rider",
      description: "Avail exclusive perks",
      buttonText: "Get Started",
      imageUrl: card2 ? card2.imageUrl.url :
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROpmw5GpV0AtJRDy3Wo_5TDuEVuelPqj8ZQw&s",
      bgColor: styles.bgYellow200,
    },
  ];


  useEffect(()=>{
    dispatch(getImage());
  },[dispatch]);

  return (
    <div className="container mt-70">
        <div className={styles.cardsContainer}>
            {cards.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.card} ${card.bgColor}`}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className={styles.cardImage}
                  />
                <div className={styles.cardContent}>
                    <p className={styles.cardDescription}>
                      {card.description}
                    </p>
                    <h3 className={styles.cardSubtitle}>{card.subtitle}</h3>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <button className={styles.cardButton}>
                      {card.buttonText}
                    </button>
                </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CardSection;
