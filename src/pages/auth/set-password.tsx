import { FC } from "react";
import { SetNewPassword } from "features/authorization";

const SetPasswordPage: FC = () => {
  return <SetNewPassword />;
};

// export default запрещаем на уровне линтера, оставляем только экспорты вида
// export {}, export const и etc.
export default SetPasswordPage;
