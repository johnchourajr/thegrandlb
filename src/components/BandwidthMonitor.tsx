import { useEffect, useState } from "react";

type BandwidthData = {
  connectionType: string;
  effectiveType: string;
  downlink: number;
  rtt: number;
};

const BandwidthMonitor = () => {
  const [bandwidthData, setBandwidthData] = useState<BandwidthData | null>(
    null
  );
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Check if connection API is available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;

      const updateConnectionInfo = () => {
        const data: BandwidthData = {
          connectionType: connection.type || "unknown",
          effectiveType: connection.effectiveType || "unknown",
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
        };

        setBandwidthData(data);

        // Consider connection slow if downlink is less than 1 Mbps or effective type is 2g/3g
        const isSlow =
          data.downlink < 1 || ["2g", "3g"].includes(data.effectiveType);
        setIsSlowConnection(isSlow);
      };

      // Initial check
      updateConnectionInfo();

      // Listen for connection changes
      connection.addEventListener("change", updateConnectionInfo);

      return () => {
        connection.removeEventListener("change", updateConnectionInfo);
      };
    }
  }, []);

  // Apply optimizations based on connection speed
  useEffect(() => {
    if (isSlowConnection) {
      // Disable autoplay videos for slow connections
      document.documentElement.setAttribute("data-slow-connection", "true");
    } else {
      document.documentElement.removeAttribute("data-slow-connection");
    }
  }, [isSlowConnection]);

  // This component doesn't render anything, it just monitors and applies optimizations
  return null;
};

export default BandwidthMonitor;
