export const getFormattedStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Принято";
    case "IN_REVIEW":
      return "На проверке";
    case "NEW":
      return "Новые";
    case "NOT_APPROVED":
      return "Не принято";
    default:
      return status;
  }
};
