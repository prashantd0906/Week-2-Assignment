import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink, useNavigate} from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {Field, Form, Formik} from "formik";

import {
  BUTTON_TEXT,
  ERROR_MESSAGES,
  FIELD_LABELS,
  FOOTER_TEXT,
  TITLES,
} from "../constants/messages";
import {login} from "../slices/authSlice";
import type {AppDispatch, RootState} from "../store/store";
import {useStyle} from "../styles/globalStyles";
import {loginSchema} from "../validation/validation";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {loading, error} = useSelector((state: RootState) => state.auth);

  const [formError, setFormError] = useState<string | null>(null);

  return (
    <Container sx={useStyle.container}>
      <Box sx={useStyle.card}>
        <Typography variant="h4" sx={useStyle.title}>
          {TITLES.LOGIN}
        </Typography>

        <Formik
          initialValues={{email: "", password: ""}}
          validationSchema={loginSchema}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            setFormError(null);

            dispatch(login(values))
              .then((resultAction) => {
                if (login.fulfilled.match(resultAction)) {
                  navigate("/todos");
                } else if (login.rejected.match(resultAction)) {
                  setFormError(resultAction.payload as string);
                }
              })
              .catch(() => {
                setFormError(ERROR_MESSAGES.GENERIC_ERROR);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({errors, touched, isSubmitting}) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label={FIELD_LABELS.email}
                fullWidth
                margin="normal"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                type="password"
                name="password"
                label={FIELD_LABELS.password}
                fullWidth
                margin="normal"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              {(formError || error) && (
                <Typography color="error" sx={useStyle.errorText}>
                  {formError || error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={useStyle.button}
                disabled={isSubmitting || loading}
              >
                {loading ? BUTTON_TEXT.LOGGING_IN : BUTTON_TEXT.LOGIN}
              </Button>

              <Typography sx={useStyle.footerText}>
                {FOOTER_TEXT.NO_ACCOUNT}{" "}
                <Link component={RouterLink} to="/register" underline="hover">
                  {FOOTER_TEXT.REGISTER_LINK}
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
