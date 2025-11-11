import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHabitsApi,
  addHabitApi,
  deleteHabitApi,
} from "../services/habitService";
import { useAuth } from "./useAuth";

export const useHabits = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { data: habits, isLoading: isLoadingHabits } = useQuery({
    queryKey: ["habits", userId],

    queryFn: () => getHabitsApi(userId),

    enabled: !!userId,
  });

  const { mutate: addHabit, isLoading: isAddingHabit } = useMutation({
    mutationFn: addHabitApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", userId] });
    },
  });

  const { mutate: deleteHabit, isLoading: isDeletingHabit } = useMutation({
    mutationFn: deleteHabitApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", userId] });

      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });

  return {
    habits: habits || [],
    isLoadingHabits,
    addHabit,
    isAddingHabit,
    deleteHabit,
    isDeletingHabit,
  };
};
