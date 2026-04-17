import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../hooks/useCart";

// Custom wrapper with all providers
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
};

// Custom render function
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Mock product data
export const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    price: 99.99,
    description: "This is a test product",
    category: "electronics",
    image: "https://test.com/image1.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 49.99,
    description: "Another test product",
    category: "clothing",
    image: "https://test.com/image2.jpg",
    rating: { rate: 3.8, count: 45 },
  },
];

// Mock cart items
export const mockCartItems = [
  {
    id: 1,
    title: "Test Product 1",
    price: 99.99,
    quantity: 2,
    image: "test.jpg",
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 49.99,
    quantity: 1,
    image: "test.jpg",
  },
];

// Helper to wait for loading states
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
