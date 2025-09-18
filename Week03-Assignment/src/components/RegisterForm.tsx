import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Button, Container, TextField, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";

import {type User, registerUser, updateUser} from "../api/api";
import {
  BUTTON_TEXT,
  ERROR_MESSAGES,
  FIELD_LABELS,
  SUCCESS_MESSAGES,
} from "../constants/messages";
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
          alert(SUCCESS_MESSAGES.REGISTER_SUCCESS);
        })
        .catch(() => setError(ERROR_MESSAGES.REGISTRATION_FAILED))
        .finally(() => {
          setLoading(false);
          setSubmitting(false);
        });
    } else {
      // Update
      updateUser(userId, values)
        .then(() => {
          setInitialValues(values);
          alert(SUCCESS_MESSAGES.UPDATE_SUCCESS);
          navigate("/login");
        })
        .catch(() => setError(ERROR_MESSAGES.UPDATE_FAILED))
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
            {Object.keys(FIELD_LABELS).map((field) => (
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
                label={FIELD_LABELS[field]}
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
                  ? BUTTON_TEXT.UPDATING
                  : BUTTON_TEXT.REGISTERING
                : userId
                  ? BUTTON_TEXT.UPDATE
                  : BUTTON_TEXT.REGISTER}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
