import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

// Mock window.location
delete window.location;
window.location = { href: "", assign: vi.fn() };

// Suppress console errors in tests (optional)
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.("Warning: ReactDOM.render is no longer supported") ||
    args[0]?.includes?.("Warning: useLayoutEffect does nothing on the server")
  ) {
    return;
  }
  originalConsoleError(...args);
};
