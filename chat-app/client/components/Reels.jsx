import { useState, useEffect } from "react";

export default function Reels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    // Fetch reels from your backend or mock API
    const fetchReels = async () => {
      const response = await fetch("API_ENDPOINT_FOR_REELS");
      const data = await response.json();
      setReels(data);
    };

    fetchReels();
  }, []);

  return (
    <div className="reels-container">
      {reels.map((reel) => (
        <video key={reel.id} src={reel.url} controls className="reel-video" />
      ))}
    </div>
  );
}
