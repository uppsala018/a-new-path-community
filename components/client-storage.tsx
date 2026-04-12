"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error(`Unable to read local storage key: ${key}`, error);
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to write local storage key: ${key}`, error);
    }
  }, [key, ready, value]);

  return { ready, value, setValue } as const;
}
