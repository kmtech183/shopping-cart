import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          🛍️ ShopHub
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/shop" className={styles.navLink}>
            Shop
          </Link>
          <Link to="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
            Cart
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
