// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Custom debounce hook
 * 
 * Why debounce search?
 * - Without debouncing, filtering runs on EVERY keystroke
 * - If someone types "Developer" (9 characters), that's 9 filter operations
 * - Debouncing waits until user stops typing before filtering
 * - Improves performance and reduces unnecessary computations
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300ms)
 * @returns {any} - The debounced value
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up: cancel the timeout if value changes before delay expires
    // This is the key to debouncing - we keep canceling and resetting
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;