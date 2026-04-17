import { useState, useEffect } from "react";
import { fetchProducts } from "../../utils/api.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import styles from "./ShopPage.module.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className={styles.loading}>Loading products...</div>;

  return (
    <div className={styles.shopPage}>
      <h1>Our Products</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
