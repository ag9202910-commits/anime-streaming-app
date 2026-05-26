'use client';
import { useState, useEffect } from 'react';

/**
 * Custom hook untuk menyimpan data di localStorage
 * @param key - Key di localStorage
 * @param initialValue - Nilai default jika key tidak ada
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  // Baca dari localStorage saat mount
  useEffect(() => {
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Tulis ke localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (mounted) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
