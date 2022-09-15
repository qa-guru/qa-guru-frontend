import * as yup from "yup";
import "yup-phone";

export const validationSchema = yup.object({
  firstName: yup.string().min(3).max(15).required("First Name is required"),
  lastName: yup.string().min(3).max(15).required("Last name is required"),
  email: yup
    .string()
    .min(3)
    .max(30)
    .required("Email is required")
    .email("Email is invalid"),
  phone: yup.string().phone().required("Phone is required"),
  gender: yup.string().required("Gender is required"),
});
