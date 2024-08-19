import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useHashState = () => {
  const [hashState, setHashState] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) setHashState(hash);
  }, []);

  useEffect(() => {
    if (hashState === "has-role") {
      toast.error("You are already registered with a different role");
      // Reset the URL by removing the hash
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [hashState]);
};

export default useHashState;
