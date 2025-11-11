import apiClient from "./api";

export const getHabitsApi = async (userId) => {
  const { data } = await apiClient.get(`/habits?userId=${userId}`);
  return data;
};

export const addHabitApi = async (habitData) => {
  const { data } = await apiClient.post("/habits", habitData);
  return data;
};

export const getCompletionsByDateApi = async (userId, date) => {
  const { data } = await apiClient.get(
    `/completions?userId=${userId}&date=${date}`,
  );
  return data;
};

export const addCompletionApi = async (completionData) => {
  const { data } = await apiClient.post("/completions", completionData);
  return data;
};

export const deleteCompletionApi = async (completionId) => {
  const { data } = await apiClient.delete(`/completions/${completionId}`);
  return data;
};

export const getAllCompletionsApi = async (userId) => {
  const { data } = await apiClient.get(`/completions?userId=${userId}`);
  return data;
};

export const deleteHabitApi = async (habitId) => {
  const { data } = await apiClient.delete(`/habits/${habitId}`);
  return data;
};
