import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axiosClient from "../lib/axiosClient";

import { setUserData } from "../redux/userSlice";

// Hook to hydrate Redux userData from the cookie/JWT.
// Call this once at app start.
const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosClient.get("/api/user/getcurrentuser");
        dispatch(setUserData(result.data.user));
      } catch {
        // If cookie is missing/expired/invalid, ensure redux reflects logged-out state.
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
