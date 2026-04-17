import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/utils";
import ProductCard from "./ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    image: "test.jpg",
    category: "electronics",
    rating: { rate: 4.5, count: 100 },
  };

  const mockOnAddToCart = vi.fn();

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("(100 reviews)")).toBeInTheDocument();
  });

  it("displays star rating correctly", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const stars = screen.getByText("★★★★½");
    expect(stars).toBeInTheDocument();
  });

  it("initializes quantity to 1", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const quantityInput = screen.getByLabelText("Quantity");
    expect(quantityInput).toHaveValue(1);
  });

  it("increases quantity when + button is clicked", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const incrementButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementButton);

    const quantityInput = screen.getByLabelText("Quantity");
    expect(quantityInput).toHaveValue(2);
  });

  it("decreases quantity when - button is clicked", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // First increase to 2
    const incrementButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementButton);

    // Then decrease to 1
    const decrementButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decrementButton);

    const quantityInput = screen.getByLabelText("Quantity");
    expect(quantityInput).toHaveValue(1);
  });

  it("prevents quantity from going below 1", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const decrementButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decrementButton);

    const quantityInput = screen.getByLabelText("Quantity");
    expect(quantityInput).toHaveValue(1);
  });

  it("calls onAddToCart with correct arguments when Add to Cart button is clicked", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // Set quantity to 3
    const incrementButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it("resets quantity to 1 after adding to cart", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const incrementButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementButton);

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    const quantityInput = screen.getByLabelText("Quantity");
    expect(quantityInput).toHaveValue(1);
  });
});
