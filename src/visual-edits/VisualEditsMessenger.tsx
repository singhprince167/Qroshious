"use client"

import React from "react";

interface VisualEditsMessengerProps {
  message?: string;
}

const VisualEditsMessenger: React.FC<VisualEditsMessengerProps> = ({ message = "Qroshious!" }) => {
  return (
    <div style={{ padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
      {message}
    </div>
  );
};

export default VisualEditsMessenger;
