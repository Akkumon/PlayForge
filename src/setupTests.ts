import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

declare global {
  interface Window {
    userEvent: typeof userEvent;
  }
}

// Extend expect matchers
expect.extend({
  toHaveBeenCalledBefore(received: any, other: any) {
    const receivedCalls = received.mock.invocationCallOrder;
    const otherCalls = other.mock.invocationCallOrder;

    if (receivedCalls.length === 0) {
      return {
        message: () => `Expected mock to have been called`,
        pass: false,
      };
    }

    if (otherCalls.length === 0) {
      return {
        message: () => `Expected comparison mock to have been called`,
        pass: false,
      };
    }

    const pass = Math.min(...receivedCalls) < Math.min(...otherCalls);

    return {
      message: () =>
        `Expected ${received.getMockName()} to have been called before ${other.getMockName()}`,
      pass,
    };
  },
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockImplementation((callback) => {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Setup userEvent
window.userEvent = userEvent;

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 