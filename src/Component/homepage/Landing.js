import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik'; // Make sure 'Formik' is imported
import cors from 'cors';
import {
  Box,
  useMediaQuery,
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import image1 from '../../assets/pupils_tree_planting.jpeg';
import { getCurrentUser } from '../../REST-API/auth/AuthProvider';
import { CallToAction } from '@material-ui/icons';

function Landing() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setmessage] = useState('');
  const [successful, setsuccessful] = useState(false);

  const crdpassword = "9876$Teta";
  const crdusername = "nemisadmin";
  const credentials = `${crdusername}:${crdpassword}`;
  const base64Credentials = btoa(credentials);
  const headers = {
    'Authorization': `Basic ${base64Credentials}`,
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'X-Token',
    'Access-Control-Allow-Credentials': 'true'
  };


  const handleSuccessAlertOpen = () => {
    setsuccessful(true);
  };
  const handleSuccessAlertClose = async () => {
    setsuccessful(true);

    const user = getCurrentUser();
    const username = user.username;
    const userCategory = user.category;

    if (parseInt(userCategory, 10) === 1) {
      console.log("BeforeFtech", username);
      fetchSchoolLocation(username);
      navigate('/app');
      return;
    }

    try {
      // Make a GET request to fetch the user's role
      const baseurl = `http://localhost/generic2/api/Users/MyRoles/${username}`;
      //const baseurl = `http://nemis.education.go.ke/generic2/api/Users/MyRoles/${username}`;
      const myroleresponse = await axios.get(`${baseurl}`, {
        headers,
      });

      const roleDescription = myroleresponse.data.roleDescription;
      const responseData = myroleresponse.data;
      console.log(responseData)
      findUserRegions(username);

      if (roleDescription === 'NEMIS_Admins') {
        navigate('/admin');
      } else if (roleDescription === 'Sub-County Directors of Education') {
        navigate('/SCDE');
      } else if (roleDescription === 'County Directors of Education') {
        navigate('/CDE');
      } else if (roleDescription === 'Region Directors of Education') {
        navigate('/RDE');
      }
    } catch (error) {
      console.error('Error while checking user data:', error);
    }
  };

  const findUserRegions = async (musername) => {
    const username = musername;
    try {
      // Make a GET request to fetch the user's county information
      const regionResponse = await axios.get(`/generic2/api/Cascade/MyRegions/${username}`, {
        headers,
      });

      const regionData = regionResponse.data;
      const regionCode = regionData.regionCode;
      const userName = regionData.userName;
      const category = regionData.category;

      console.log(regionData);
      //Save User Region Mapping

    } catch (error) {
      console.error('Error while checking user location:', error);
    }
  }

  const fetchSchoolLocation = async (uic) => {
    console.log(uic);
    try {
      // Make a GET request to fetch the school location information
      const baseurl = `http://localhost/generic2/api/institution/Admin/${uic}`;
      //const baseurl = `http://nemis.education.go.ke/generic2/api/institution/Admin/${uic}`;
      const schoolResponse = await axios.get(`${baseurl}`, {
        headers,});
      console.log(schoolResponse);
      const schoolData = schoolResponse.data[0];

      console.log(schoolData);
      //Save in a Stored Procedure School Location Detail
      const data = {
          uic: schoolData.institution_Code,
          institution_name: schoolData.institution_Name,
          region_code: schoolData.region_Code,
          region_name: schoolData.region_Name,
          county_code: schoolData.county_Code,
          county_name: schoolData.county_Name,
          sub_county_code: schoolData.sub_County_Code,
          sub_county_name: schoolData.sub_County_Name,
          constituency_code: schoolData.constituency_Code,
          constituency_name: schoolData.constituency_Name,
          zone_code: schoolData.zone_Code,
          ward_code: schoolData.ward_Code,
          ward_name: schoolData.ward_Name,
          level_code: schoolData.institution_Level_Code,
          level_name: schoolData.level_Name,
          type: schoolData.institution_Type
        };

        handleSaveSchoolLocation(data);

    } catch (error) {
      console.error('Error while fetching school location:', error);
    }
  };


const handleSaveSchoolLocation = (data) => {
    // Make a POST request to save data
    console.log("Our Data",data);
    
    axios
      .post("http://localhost:890/api/v1/School/AddLocation", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
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

  const signin = async (validationSchema) => {


    const username = validationSchema.username;
    const password = validationSchema.password;

    try {
      //const baseurl = "http://nemis.education.go.ke/generic2/api/Users/alogin";
      const baseurl = "http://localhost/generic2/api/Users/alogin";
      const response = await axios.get(`${baseurl}`, {
        headers,
        params: {
          username,
          password,
        },
      });
      
      // Handle the successful response here
      if (response) {
        const userData = response.data;

        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        setmessage('Kindly close this alert to access your dashboard.');
        console.log('Successfully logged in and user data saved to the database!');
      }
    } catch (err) {
      console.error(err.toString());
      throw err;
    }
  };



  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');
  const navbarHeight = '100px';

  const landingStyles = {
    margin: 0,
    padding: 0,
    background: `url(${image1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh ',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    top: '0',
    width: 'auto',
    paddingTop: isMobile ? navbarHeight : '65px',
    paddingBottom: isMobile ? CallToAction : '65px',
  };

  const loginCardStyles = {
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(163.77deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.32) 100%)',
    width: '100%',
    maxWidth: isMobile ? '100%' : '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#fff',
    flexDirection: 'column',
    padding: '15px',
    textAlign: 'center',
    float: isMobile ? 'left' : 'right',
  }

  if (isTablet) {
    loginCardStyles.width = '80%';
    loginCardStyles.marginLeft = '10px';
  }
  if (isMobile) {
    loginCardStyles.width = '100%';
    loginCardStyles.marginLeft = '10px';
    loginCardStyles.height = '100%';
  }
  if (isLargeScreen) {
    loginCardStyles.width = '60%';
    loginCardStyles.marginLeft = '20px';
    loginCardStyles.padding = '20px';
  }

  const avatarStyles = {
    width: '5rem',
    height: '5rem',
    backgroundColor: '#808080',
    borderRadius: '50%',
    margin: '0 auto 1.2rem',
    color: '#fff',
  };

  if (isMobile) {
    avatarStyles.width = '2.3rem';
    avatarStyles.margin = '0 auto 0.1rem';
    avatarStyles.height = '2.3rem';
  }

  const formStyles = {
    textAlign: 'left',
    width: '100%',
    height: '100%',
  }

  if (isMobile) {
    formStyles.marginBottom = '2px';
  }

  const headerStyles = {
    fontSize: isMobile ? '20px' : '30px',
    marginTop: isMobile ? '1rem' : '0',
  };

  const headerInsideStyles = {
    margin: isMobile ? '2% 0 2% 0' : '2% 0 4% 0',
  };

  const handleLogin = () => {
    console.log("welcome to elimu trees");
    navigate('/login', { replace: true });
  }

  return (
    <div className='landing' style={landingStyles}>
      <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <div padding='3rem'>
              <div className='landing-header' style={headerStyles}>
                <Typography variant="h2" gutterBottom>
                  Welcome to Elimu Trees:
                </Typography>
                <Typography variant="h1" gutterBottom>
                  School Tree Planting Monitoring System
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Discover A Greener Future
                </Typography>
              </div>
              <div gutterBottom>
                <Button
                  className='landing-btn'
                  variant='contained'
                  color='warning'
                  size='large'
                  sx={{ fontWeight: 'bold' }}
                >
                  <Link href="/about">GET STARTED</Link>
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={loginCardStyles}>
              <Avatar src='' alt='Avatar' style={avatarStyles} />
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
                        color="textSecondary"
                        variant="h2"
                      >
                        Login
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

                    </Grid>

                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Username: NemisCode"
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
                      label="Password: NemisPassword"
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
                        Login
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      alignItems="center"
                    >
                      Don&apos;t have an account?
                      {' '}
                      <Link
                        component={RouterLink}
                        to="http://nemis.education.go.ke/userregister.aspx"
                        variant="h6"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </form>


                )}
              </Formik>


            </Paper>
          </Grid>



        </Grid>
      </Container>
    </div>
  );
}

export default Landing;
