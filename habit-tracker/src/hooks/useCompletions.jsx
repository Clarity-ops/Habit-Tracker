import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompletionsByDateApi,
  addCompletionApi,
  deleteCompletionApi,
} from "../services/habitService";
import { useAuth } from "./useAuth";

export const useCompletions = (date) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const completionsQueryKey = ["completions", date, userId];
  const allCompletionsKey = ["completions", "all", userId];

  const { data: completions, isLoading: isLoadingCompletions } = useQuery({
    queryKey: completionsQueryKey,
    queryFn: () => getCompletionsByDateApi(userId, date),
    enabled: !!userId && !!date,
  });

  const { mutate: addCompletion, isLoading: isAddingCompletion } = useMutation({
    mutationFn: addCompletionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: completionsQueryKey });
      queryClient.invalidateQueries({ queryKey: allCompletionsKey });
    },
  });

  const { mutate: deleteCompletion, isLoading: isDeletingCompletion } =
    useMutation({
      mutationFn: deleteCompletionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: completionsQueryKey });
        queryClient.invalidateQueries({ queryKey: allCompletionsKey });
      },
    });

  const isLoading =
    isLoadingCompletions || isAddingCompletion || isDeletingCompletion;

  return {
    completions: completions || [],
    isLoading,
    addCompletion,
    deleteCompletion,
  };
};
