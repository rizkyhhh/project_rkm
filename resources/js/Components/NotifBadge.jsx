import { useEffect, useState } from "react";
import axios from "axios";

export default function NotifBadge() {
  const [count, setCount] = useState(0);

  const fetchCount = () => {
    axios.get("/notifikasi/count").then(res => {
      setCount(res.data.total);
    });
  };

  useEffect(() => {
    fetchCount();

    // 🔥 polling tiap 5 detik
    const interval = setInterval(fetchCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      🔔
      {count > 0 && (
        <span style={{
          position: "absolute",
          top: -5,
          right: -10,
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: 12
        }}>
          {count}
        </span>
      )}
    </div>
  );
}