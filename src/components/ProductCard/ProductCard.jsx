import { useState } from "react";
import QuantitySelector from "../QuantitySelector/QuantitySelector.jsx";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  // Generate star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += "★";
    }
    if (hasHalfStar) {
      stars += "½";
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += "☆";
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.rating}>
          <span className={styles.stars}>
            {product.rating && renderStars(product.rating.rate)}
          </span>
          {product.rating && (
            <span className={styles.reviewCount}>
              ({product.rating.count} reviews)
            </span>
          )}
        </div>

        <div className={styles.price}>${product.price.toFixed(2)}</div>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <button onClick={handleAddToCart} className={styles.addButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
