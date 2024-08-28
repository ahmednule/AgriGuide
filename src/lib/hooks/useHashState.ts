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
      toast.error("You are already registered with a different role.a");
      // Reset the URL by removing the hash
      window.history.replaceState(null, "", window.location.pathname);
    } else if (hashState === "pending") {
      toast.error("Please wait for approval.");
      window.history.replaceState(null, "", window.location.pathname);
    } else if (hashState === "rejected") {
      toast.error("Your application has been rejected, please try again soon or contact us.");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [hashState]);
};

export default useHashState;
