import { useState, useEffect } from "react";

// 4 - custom hook

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  // 5 - refatorando post

  const [config, setConfig] = useState<{
    method: string | null;
    headers: { "Content-type": string } | null;
    body: string | null;
  } | null>(null);

  const [method, setMethod] = useState<string | null>(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6 - loading
  const [loading, setLoading] = useState(false);

  const httpConfig = (data: T | T[], method: string) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - loading
      setLoading(true);

      const res = await fetch(url);

      const json = await res.json();

      setData(json);

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - refatorando post

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = {
          method: config?.method || "POST",
          headers: config?.headers || { "Content-type": "application/json" },
          body: config?.body || JSON.stringify({}),
        };

        const res = await fetch(url, fetchOptions);

        const json = await res.json();

        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading };
};
