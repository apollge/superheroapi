import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";

const useDebounceCallback = (callback: () => void | Promise<void>) => {
  const ref = useRef<() => void | Promise<void>>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = async () => {
      await ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

export default useDebounceCallback;
