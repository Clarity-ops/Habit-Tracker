import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useHabits } from "./useHabits";
import { getAllCompletionsApi } from "../services/habitService";
import { formatDateString } from "../utils/dateUtils";

export const useProgressData = () => {
  const { userId } = useAuth();

  const { habits, isLoadingHabits } = useHabits();
  const totalHabits = habits.length;

  const { data: allCompletions, isLoading: isLoadingCompletions } = useQuery({
    queryKey: ["completions", "all", userId],
    queryFn: () => getAllCompletionsApi(userId),
    enabled: !!userId,
  });

  const progressData = useMemo(() => {
    if (!allCompletions || totalHabits === 0) {
      return Array(15).fill(0);
    }

    const completionsCountByDate = new Map();
    allCompletions.forEach((comp) => {
      const count = completionsCountByDate.get(comp.date) || 0;
      completionsCountByDate.set(comp.date, count + 1);
    });

    const data = [];
    const today = new Date();

    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const dateString = formatDateString(date);
      const count = completionsCountByDate.get(dateString) || 0;

      const percentage = Math.round((count / totalHabits) * 100);
      data.push(percentage);
    }

    return data;
  }, [allCompletions, totalHabits]);

  const isLoading = isLoadingHabits || isLoadingCompletions;

  return { progressData, isLoading };
};
