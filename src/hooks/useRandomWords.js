import { useEffect, useRef, useState } from "react";
import { fetchRandomWords } from "../services/randomWords.js";

export default function useRandomWords() {
  const activeRequest = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      activeRequest.current?.abort();
    };
  }, []);

  function clearError() {
    setError("");
  }

  async function loadWords() {
    // A ref prevents repeated submissions before React updates the button.
    if (activeRequest.current) return null;

    const controller = new AbortController();
    activeRequest.current = controller;
    setIsLoading(true);
    setError("");

    try {
      const words = await fetchRandomWords({ signal: controller.signal });
      return controller.signal.aborted ? null : words;
    } catch (requestError) {
      if (!controller.signal.aborted) {
        const message =
          requestError.name === "TimeoutError"
            ? "Getting words took too long. Try again or use your own words."
            : "Couldn’t get random words. Try again or use your own words.";
        setError(message);
      }
      return null;
    } finally {
      activeRequest.current = null;
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }

  return { loadWords, isLoading, error, clearError };
}
