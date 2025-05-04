// components/Navbar.tsx
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      padding: "16px",
      zIndex: 1000,
      background: "rgba(255,255,255,0.5)",
      backdropFilter: "blur(10px)",
      borderBottomLeftRadius: "12px"
    }}>
      <ConnectWallet />
    </div>
  );
}
