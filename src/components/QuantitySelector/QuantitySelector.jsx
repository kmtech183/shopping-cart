import styles from "./QuantitySelector.module.css";

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
}) {
  const increment = () => {
    if (quantity < max) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      setQuantity(min);
    } else {
      value = Math.max(min, Math.min(max, value));
      setQuantity(value);
    }
  };

  return (
    <div className={styles.selector}>
      <button
        onClick={decrement}
        className={styles.button}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        -
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className={styles.input}
        min={min}
        max={max}
        aria-label="Quantity"
      />

      <button
        onClick={increment}
        className={styles.button}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
