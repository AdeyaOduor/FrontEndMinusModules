import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from '../../REST-API/api';

const Register = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('');
  const [successful, setsuccessful] = useState(false);

  const handleSuccessAlertOpen = () => {
    setsuccessful(true);
  };

  const handleSuccessAlertClose = () => {
    setsuccessful(false);
    console.log(message);
    // On successful registration, you are navigated to login.
    navigate('/login', { replace: true });
  };

  // Opens Error Alert Message when login fails.
  const handleErrorAlertOpen = () => {
    setOpen(true);
  };

  // Handles Closing of Error Alert Message.
  const handleErrorAlertClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>Register | Proffessional Application</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">

          <Formik
            initialValues={{
              email: '',
              phone_number: '',
              firstname: '',
              lastname: '',
              username: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                username: Yup.string().required('Username is required'),
                phone_number: Yup.string().required('Phone number is required'),
                firstname: Yup.string().min(2, 'Name must be more than 2 characters.').max(255).required('First name is required'),
                lastname: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
                password: Yup.string().min(5, 'Password should be more than 5 characters.').max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={async (validationSchema) => {
              console.log(validationSchema);
              // Register Method
              await api.post('/users/register', validationSchema)
                .then((response) => {
                  handleSuccessAlertOpen();
                  setmessage(response.data);
                  console.log(`Successfull! : ${response.data}`);
                }
              ).catch((error) => {
                  handleErrorAlertOpen();
                  setmessage(error.toString());
                  console.error(`Failed! : ${error.toString()}`);
                }
                );
            }
          }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                {/* Message Upon unsuccessful  */}
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleErrorAlertClose();
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>Failed</AlertTitle>
                    Registration unsuccessfull !
                    {' '}
                    {/* <strong>{message}</strong> */}
                  </Alert>
                </Collapse>

                {/* Message Upon successful registration  */}
                <Collapse in={successful}>
                  <Alert
                    severity="success"
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleSuccessAlertClose();
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>Success</AlertTitle>
                    Registration successfull !
                    {' '}
                    {/* <strong>{message}</strong> */}
                  </Alert>
                </Collapse>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.firstname && errors.firstname)}
                      fullWidth
                      helperText={touched.firstname && errors.firstname}
                      label="First name"
                      margin="normal"
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.lastname && errors.lastname)}
                      fullWidth
                      helperText={touched.lastname && errors.lastname}
                      label="Last name"
                      margin="normal"
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Username"
                      margin="normal"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.username}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      fullWidth
                      helperText={touched.phone_number && errors.phone_number}
                      label="Phone number"
                      margin="normal"
                      name="phone_number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="phone_number"
                      value={values.phone_number}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
