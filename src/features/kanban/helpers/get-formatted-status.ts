export const getFormattedStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Approved";
    case "IN_REVIEW":
      return "In review";
    case "NEW":
      return "New";
    case "NOT_APPROVED":
      return "Not approved";
    default:
      return status;
  }
};
