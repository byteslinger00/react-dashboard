import React from "react";
import { Client } from "./api-clients";
import useAppContext from "../core/useAppContext";

const createProxiedFetch = (appendHeaders: Object): any => {
  return async (url: string, options: any) => {
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    options.headers = { ...options.headers, ...appendHeaders };

    try {
      return await window.fetch(url, options);
    } catch (e) {
      return 1;
    }
  };
};

function useProxiedFetch() {
  return React.useMemo(() => {
    const appendHeaders: any = {};
    //  const authToken =  window.localStorage.getItem(".jwt");
     const authToken =  "1337H4X";
    if (authToken) {
      appendHeaders["Authorization"] = `Bearer ${authToken}`;
    }
    return createProxiedFetch(appendHeaders);
  }, []);
}

export function useGlobalApiClient(): Client {
  const app = useAppContext();
  const proxyFetch = useProxiedFetch();
  
  return React.useMemo(
    // () => new Client(app.apiBaseUrl, { fetch: proxyFetch }),
    // [app.apiBaseUrl, proxyFetch]
    () => new Client("https://backend.baohule.com", { fetch: proxyFetch }),
    ["https://backend.baohule.com", proxyFetch]
  );
}

export default function useApiClient() {
  const global = useGlobalApiClient();
  return global;
}
