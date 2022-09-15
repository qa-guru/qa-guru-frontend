import { useEffect, useState } from "react";
import { InitialHookStatus } from "@react-buddy/ide-toolbox";
import { useAuthStore } from "../features/Authorization/context/AuthContext";
import { DEV_LOGIN, DEV_PASSWORD } from "../config";

export const useInitial: () => InitialHookStatus = () => {
  const authStore = useAuthStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    async function login() {
      const response = await authStore.login(DEV_LOGIN, DEV_PASSWORD);
      if (response?.status !== 200) {
        setError(true);
      }
      setLoading(false);
    }

    login();
  }, [authStore]);

  return { loading, error };
};
