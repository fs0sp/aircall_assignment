import { useState, useEffect } from "react";

export const useCallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCallLogs = async () => {
    try {
      const response = await fetch('https://cerulean-marlin-wig.cyclic.app/activities');

      if (!response.ok) {
        throw new Error(`Failed to fetch call logs. Status: ${response.status}`);
      }

      const data = await response.json();
      setCallLogs(data);
    } catch (error) {
      setError(error); // Set the actual error object
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return { callLogs, loading, error, fetchCallLogs };
};
