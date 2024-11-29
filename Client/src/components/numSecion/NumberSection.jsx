import styles from './number.module.css';

const NumberSection = () => {
  const stats = [
    { number: "546+", label: "Registered Riders" },
    { number: "789,900+", label: "Orders Delivered" },
    { number: "690+", label: "Restaurants Partners" },
    { number: "17,457+", label: "Food Items" },
  ];

  return (
    <div className="container mt-70">
        <section className={styles.bg}>
            <div className={styles.container}>
                <div className={styles.grid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.numContainer}>
                        <h3 className={styles.text3xl}>{stat.number}</h3>
                        <p className={styles.subText}>{stat.label}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    </div>
  );
};

export default NumberSection;
