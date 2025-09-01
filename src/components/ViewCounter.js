import { useEffect, useState } from "react";

const ViewCounter = () => {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordView = async () => {
      try {
        // Record the view
        await fetch("/api/viewers", {
          method: "POST",
        });

        // Get total views
        const response = await fetch("/api/viewers");
        const data = await response.json();
        setViewCount(data.views);
      } catch (error) {
        console.error("Error recording view:", error);
      } finally {
        setLoading(false);
      }
    };

    recordView();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 rounded-full py-2 px-4 text-sm text-gray-300 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span>{viewCount} portfolio views</span>
      )}
    </div>
  );
};

export default ViewCounter;
