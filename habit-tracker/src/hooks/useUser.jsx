import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api";
import { useAuth } from "./useAuth";

const fetchUser = async (userId) => {
  const { data } = await apiClient.get(`/users/${userId}`);
  return data;
};

export const useUser = () => {
  const { userId, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["user", userId],

    queryFn: () => fetchUser(userId),

    enabled: isAuthenticated,
  });
};
