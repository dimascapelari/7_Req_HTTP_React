import { useState, useEffect } from "react";

// 4 - custom hook

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
    };

    fetData();
  }, [url]);

  return { data };
};
