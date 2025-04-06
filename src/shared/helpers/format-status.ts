export const formatStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Принято";
    case "IN_REVIEW":
      return "На проверке";
    case "REVIEW":
      return "Новые";
    case "NOT_APPROVED":
      return "Не принято";
    default:
      return status;
  }
};
