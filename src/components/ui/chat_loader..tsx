"use client";

import { useEffect } from "react";

export function ChatLoader() {
  useEffect(() => {
    if (document.getElementById("fw-chat-widget")) return;

    // Configure BEFORE script loads
    window.fcWidgetMessengerConfig = {
      config: {
        headerProperty: {
          direction: "rtl",
          backgroundColor: "#3D4C63",
        },
        cssNames: {
          widget: "custom_fc_frame",
        },
      },
    };

    const script = document.createElement("script");
    script.id = "fw-chat-widget";
    script.src = "//uae.fw-cdn.com/40344074/216337.js";
    script.async = true;
    script.setAttribute("data-chat", "true");

    document.body.appendChild(script);
  }, []);

  return null;
}
