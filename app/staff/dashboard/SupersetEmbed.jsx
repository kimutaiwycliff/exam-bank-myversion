'use client';

import { embedDashboard } from "@superset-ui/embedded-sdk";
import { useEffect, useRef } from "react";

const SupersetEmbed = () => {
  const supersetRef = useRef(null);

  useEffect(() => {
    const fetchTokenAndEmbed = async () => {
      try {
        // Fetch the guest token from the Next.js API route
        const response = await fetch("/api/get-superset-token");
        const data = await response.json();


        // Embed the Superset dashboard using the Superset SDK
        await embedDashboard({
          id: "93fbab31-86ce-42ca-a9bb-0e79e6ea4edc", // Your Superset dashboard ID
          supersetDomain: "http://localhost:8088", // Superset domain
          mountPoint: supersetRef.current,
          fetchGuestToken: () => Promise.resolve(data?.token), // Pass the token to the SDK
          dashboardUiConfig: {
            hideTitle: true,
            filters: false,
          },
        });
      } catch (error) {
        console.error("Error embedding dashboard:", error);
      }
    };

    fetchTokenAndEmbed();
  }, []);

  return <div ref={supersetRef} style={{ width: "100%", height: "800px" }} />;
};

export default SupersetEmbed;
