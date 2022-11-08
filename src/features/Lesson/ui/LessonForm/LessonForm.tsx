import { Button, Typography } from "antd";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Ui from "../../../../shared/ui/InputRHF";

const LessonForm = () => {
  const { handleSubmit, control } = useForm<any>({});
  const [data, setData] = useState<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    setData(data);
  };
  return (
    <div>
      <Typography>Анкета</Typography>
      <Ui.Slider
        name=""
        control={control}
        min={1}
        max={10}
        label="Качество информации от преподавателя от 1 до 10-ти баллов?"
      />
      <Ui.Slider
        name=""
        control={control}
        min={1}
        max={10}
        label="Уровень компетентности преподавателя в теме занятия от 1-го до 10-ти баллов"
      />
      <Ui.TextArea
        name=""
        control={control}
        label="Развёрнутые замечания по процессу обучения в паре предложений (при их наличии)"
      />
      <Ui.TextArea
        name=""
        control={control}
        label="Что в теме урока было рассмотрено недостаточно, о чём хотелось бы узнать подробнее?"
      />
      <Button htmlType="submit">Отправить</Button>
    </div>
  );
};

export default LessonForm;
