'use client';

import { embedDashboard } from "@superset-ui/embedded-sdk";
import { useEffect, useRef, useState } from "react";

const SupersetEmbed = () => {
  const supersetRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenAndEmbed = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the guest token from the Next.js API route
        const response = await fetch("/api/get-superset-token");
        if (!response.ok) throw new Error("Failed to fetch token");

        const data = await response.json();
        if (!data?.token) throw new Error("Invalid token received");

        // Embed the Superset dashboard using the SDK
        await embedDashboard({
          id: "93fbab31-86ce-42ca-a9bb-0e79e6ea4edc", // Your Superset dashboard ID
          supersetDomain: "http://localhost:8088", // Superset domain
          mountPoint: supersetRef.current, // The container where the dashboard will be embedded
          fetchGuestToken: () => Promise.resolve(data?.token), // Pass the token to the SDK
          dashboardUiConfig: {
            hideTitle: true,
            filters: false,
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error embedding dashboard:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTokenAndEmbed();
  }, []);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-red">Error: {error}</p>}
      <div ref={supersetRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default SupersetEmbed;
