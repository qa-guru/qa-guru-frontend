import React from "react";
import Ui from "../../../../shared/ui/Input";
import Content from "../../config/ContentPracticeForm";
import { IFormViewsProps } from "./FormViews.types";
import styles from "./FormViews.module.scss";

const FormViews: React.FC<IFormViewsProps> = ({
  control,
  setValue,
  yupSync,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Ui.Text
          name="firstName"
          control={control}
          label="First Name"
          yupSync={yupSync}
        />
        <Ui.Text
          name="lastName"
          control={control}
          label="Last Name"
          yupSync={yupSync}
        />
      </div>

      <div className={styles.wrapper}>
        <Ui.Text
          name="email"
          control={control}
          label="Email"
          placeholder="name@example.com"
          yupSync={yupSync}
        />
        <Ui.Text
          name="phone"
          control={control}
          label="Phone"
          yupSync={yupSync}
        />
      </div>

      <div className={styles.wrapper}>
        <Ui.SelectOption
          label="Select Language"
          name="language"
          control={control}
          content={Content.LanguageContent.options}
        />
        <Ui.Date name="birthDate" control={control} label="Birthdate" />
      </div>

      <div className={styles.wrapp}>
        <Ui.Radio
          name="gender"
          control={control}
          label="Gender:"
          content={Content.GenderContent.options}
          yupSync={yupSync}
        />
        <Ui.Checkbox
          control={control}
          name="hobbies"
          label="Hobbies:"
          content={Content.HobbiesContent.options}
        />
      </div>

      <div className={styles.contenier}>
        <Ui.SelectMultiple
          name="subjects"
          control={control}
          label="Subjects"
          content={Content.SubjectsContent.subjects}
        />
      </div>

      <Ui.SelectCascader
        name="stateCity"
        control={control}
        placeholder="Select"
        label="Select State and City:"
        setValue={setValue}
        content={Content.StateCityContent.options}
      />

      <div className={styles.contenier}>
        <Ui.Slider name="slider" control={control} label="Slider" />
      </div>

      <Ui.TextArea name="address" control={control} label="Address" />
      <Ui.FileUploud name="file" control={control} setValue={setValue} />
    </>
  );
};

export default FormViews;
