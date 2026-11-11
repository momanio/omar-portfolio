import { useEffect, useState } from "react";

/** Critical verified text paints before importing the CMS client for background updates. */
export function useIdleQuery() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
      else setEnabled(true);
    }, 800);
    return () => { clearTimeout(timer); if (idle !== undefined) window.cancelIdleCallback(idle); };
  }, []);
  return enabled;
}
