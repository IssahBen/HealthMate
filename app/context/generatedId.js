export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const calculateProgress = (progress) => {
  const completed = progress.filter((p) => p).length;
  return progress.length > 0
    ? Math.round((completed / progress.length) * 100)
    : 0;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
