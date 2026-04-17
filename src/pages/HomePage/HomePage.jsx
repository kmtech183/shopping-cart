import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1>Welcome to Shophub</h1>
        <p>Discover amazing products at unbeatable prices</p>
        <button className={styles.ctaButton} onClick={() => navigate("/shop")}>
          Shop Now
        </button>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💎</div>
          <h3>Premium Quality</h3>
          <p>100% satisfaction guaranteed</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🛡️</div>
          <h3>Secure Payment</h3>
          <p>Your data is protected</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </div>
    </div>
  );
}
