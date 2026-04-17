import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "./useCart";

describe("useCart Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product = { id: 1, title: "Test", price: 10, image: "test.jpg" };

    act(() => {
      result.current.addToCart(product, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({ ...product, quantity: 2 });
    expect(result.current.getCartCount()).toBe(2);
    expect(result.current.getCartTotal()).toBe(20);
  });

  it("should update quantity of existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product = { id: 1, title: "Test", price: 10, image: "test.jpg" };

    act(() => {
      result.current.addToCart(product, 2);
      result.current.addToCart(product, 3);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.getCartCount()).toBe(5);
    expect(result.current.getCartTotal()).toBe(50);
  });

  it("should update quantity of specific item", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product = { id: 1, title: "Test", price: 10, image: "test.jpg" };

    act(() => {
      result.current.addToCart(product, 2);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.getCartCount()).toBe(5);
  });

  it("should remove item when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product = { id: 1, title: "Test", price: 10, image: "test.jpg" };

    act(() => {
      result.current.addToCart(product, 2);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("should calculate total correctly for multiple items", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product1 = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "test.jpg",
    };
    const product2 = {
      id: 2,
      title: "Product 2",
      price: 20,
      image: "test.jpg",
    };

    act(() => {
      result.current.addToCart(product1, 2);
      result.current.addToCart(product2, 3);
    });

    expect(result.current.getCartTotal()).toBe(80); // (10*2) + (20*3)
    expect(result.current.getCartCount()).toBe(5);
  });

  it("should persist cart to localStorage", async () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    const product = { id: 1, title: "Test", price: 10, image: "test.jpg" };

    act(() => {
      result.current.addToCart(product, 2);
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
      //   const savedCart = JSON.parse(localStorage.setItem.mock.calls[0][1]);

      const lastCall =
        localStorage.setItem.mock.calls[
          localStorage.setItem.mock.calls.length - 1
        ];
      const savedCart = JSON.parse(lastCall[1]);
      expect(savedCart).toHaveLength(1);
    });
  });
});
