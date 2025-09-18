import * as Yup from "yup";

//Login Schema
export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//Register Schema
export const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .positive("Must be positive")
    .integer("Must be an integer")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Password must be alphanumeric",
    )
    .required("Password is required"),
});
