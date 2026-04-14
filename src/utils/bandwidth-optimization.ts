/**
 * Connection-aware helpers for media playback (Network Information API,
 * reduced motion). Used by inline video and canvas noise generation.
 */

/** Network Information API (not in all TS libs). See https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API */
type NetworkInformation = {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

export function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined" || !("connection" in navigator))
    return undefined;
  return (navigator as NavigatorWithConnection).connection;
}

/**
 * Whether ambient video may auto-play: honors reduced motion and slow /
 * data-saver connections.
 */
export function shouldAutoPlayVideo(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const connection = getConnection();
  if (connection?.saveData) return false;
  if (
    connection?.effectiveType &&
    ["slow-2g", "2g", "3g"].includes(connection.effectiveType)
  ) {
    return false;
  }

  return true;
}
