import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Button, Container, TextField, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";

import {type User, registerUser, updateUser} from "../api/api";
import {useStyle} from "../styles/globalStyles";
import {registerSchema} from "../validation/validation";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    phoneNo: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (
    values: User,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setLoading(true);
    setError(null);

    if (!userId) {
      // Register
      registerUser(values)
        .then((res) => {
          setUserId(res.id!);
          setInitialValues(res);
          alert(
            "Registration successful! You can now edit your profile below.",
          );
        })
        .catch(() => setError("Registration failed"))
        .finally(() => {
          setLoading(false);
          setSubmitting(false);
        });
    } else {
      // Update
      updateUser(userId, values)
        .then(() => {
          setInitialValues(values);
          alert("Profile updated successfully!");
          navigate("/login");
        })
        .catch(() => setError("Update failed"))
        .finally(() => {
          setLoading(false);
          setSubmitting(false);
        });
    }
  };

  return (
    <Container maxWidth="xs" sx={useStyle.container}>
      <Typography variant="h4" sx={useStyle.title}>
        {userId ? "Edit Profile" : "Register"}
      </Typography>

      <Formik<User>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values, {setSubmitting}) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({errors, touched, isSubmitting}) => (
          <Form>
            {[
              "firstName",
              "lastName",
              "email",
              "age",
              "gender",
              "phoneNo",
              "password",
            ].map((field) => (
              <Field
                key={field}
                as={TextField}
                name={field}
                type={
                  field === "age"
                    ? "number"
                    : field === "password"
                      ? "password"
                      : "text"
                }
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="normal"
                error={Boolean(
                  touched[field as keyof User] && errors[field as keyof User],
                )}
                helperText={
                  touched[field as keyof User] && errors[field as keyof User]
                }
              />
            ))}

            {error && (
              <Typography color="error" sx={useStyle.errorText}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={useStyle.button}
              disabled={isSubmitting || loading}
            >
              {loading
                ? userId
                  ? "Updating..."
                  : "Registering..."
                : userId
                  ? "Update Profile"
                  : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
