import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";

import { ClientStyleContext } from "./context";
import createEmotionCache, { defaultCache } from "./createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
