import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});