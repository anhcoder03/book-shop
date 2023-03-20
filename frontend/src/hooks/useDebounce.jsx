import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [inValue, setInValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setInValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return inValue;
}
