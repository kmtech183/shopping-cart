import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchProducts, fetchProductById } from "./api";

describe("API Utilities", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("fetches products successfully", async () => {
    const mockProducts = [{ id: 1, title: "Test Product" }];
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
    );
  });

  it("handles fetch error", async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));

    const products = await fetchProducts();
    expect(products).toEqual([]);
  });

  it("handles HTTP error response", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const products = await fetchProducts();
    expect(products).toEqual([]);
  });

  it("fetches single product by id", async () => {
    const mockProduct = { id: 1, title: "Test Product" };
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockProduct,
    });

    const product = await fetchProductById(1);
    expect(product).toEqual(mockProduct);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/1",
    );
  });

  it("handles error when fetching single product", async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));

    const product = await fetchProductById(1);
    expect(product).toBeNull();
  });
});
