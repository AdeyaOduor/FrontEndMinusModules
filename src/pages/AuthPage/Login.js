import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import useApi from '../../REST-API/api/useApi';
const Login = () => {

  const navigate = useNavigate();
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setmessage] = useState('');
  const [successful, setsuccessful] = useState(false);

  const handleSuccessAlertOpen = () => {
    setsuccessful(true);
  };
  const handleSuccessAlertClose = () => {
    setsuccessful(true);
    // On successful login, you are navigated to dashboard page if profile details.
    // else yo go through onboarding process to create company profile
    // const user = getCurrentUser();
    // const checkChat = api.get('staffs/checkStaff', { params: { userId: user.id } })
    //   .then((response) => {
    //     if (response.data === true) {
    navigate('/app/account', { replace: true });
    //     } else {
    //       navigate('/onboard/onboarding', {
    //         replace: true
    //       });
    //     }
    //   });
    // console.log(checkChat);
    // navigate('/app/staffs', { replace: true });
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

  // login method
  const signin = async (validationSchema) => api.post('/users/login', validationSchema)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setmessage('kindly close this alert to access your dashboard.');
        console.log('Successfully logged in!!');
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err.toString());
      throw err;
    });

  return (
    <>
      <Helmet>
        <title>Login | Proffessional Application</title>
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
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(validationSchema) => {
              signin(validationSchema).then(
                () => {
                  handleSuccessAlertOpen();
                }
              ).catch((error) => {
                handleErrorAlertOpen();
                console.log(`Login Failed: ${error.toString()}`);
                setErrorMessage(`Please Check username/password and try again { ${error.toString()} }`);
              });
            }}
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
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                {/* Message Upon unsuccessful login */}
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
                    <AlertTitle>Error</AlertTitle>
                    Login unsuccessful !
                    {' '}
                    <strong>{errorMessage}</strong>
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
                    Logged in successfully !
                    {' '}
                    <strong>{message}</strong>
                  </Alert>
                </Collapse>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    {/* <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="outlined"
                    >Login with Facebook
                    </Button> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    {/* <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="outlined"
                    >Login with Google
                    </Button> */}
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
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

export default Login;
