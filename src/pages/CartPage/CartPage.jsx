import { useCart } from "../../hooks/useCart";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cartItems, updateQuantity, getCartTotal, getCartCount } = useCart();
  const total = getCartTotal();
  const itemCount = getCartCount();

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <button
            className={styles.shopNowButton}
            onClick={() => (window.location.href = "/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart ({itemCount} items)</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <h3>{item.title}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.itemQuantity}>
                <button
                  className={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className={styles.removeButton}
                onClick={() => updateQuantity(item.id, 0)}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryRow}>
            <span>Subtotal ({itemCount} items):</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>{total > 50 ? "Free" : "$5.99"}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>
              ${total > 50 ? total.toFixed(2) : (total + 5.99).toFixed(2)}
            </span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
