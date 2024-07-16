import dayjs from "dayjs";

export const formatDate = (date: number, format: string) => {
  return dayjs(date).format(format);
};
