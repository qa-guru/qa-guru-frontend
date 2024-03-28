import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

export interface ICard {
  card: StudentHomeWorkDto;
  onCardClick?: () => void;
  isActive?: boolean;
}
