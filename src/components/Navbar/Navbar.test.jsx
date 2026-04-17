import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "../../test/utils";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders navigation links correctly", () => {
    render(<Navbar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("displays cart count badge when items are in cart", () => {
    // Set cart items in localStorage
    const cartItems = [{ id: 1, quantity: 3 }];
    localStorage.setItem("cart", JSON.stringify(cartItems));

    render(<Navbar />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not display cart badge when cart is empty", () => {
    render(<Navbar />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    render(<Navbar />);

    const homeLink = screen.getByText("Home").closest("a");
    const shopLink = screen.getByText("Shop").closest("a");
    const cartLink = screen.getByText("Cart").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(shopLink).toHaveAttribute("href", "/shop");
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
