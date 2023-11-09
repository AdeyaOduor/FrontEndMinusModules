import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Landing } from '../../Component/homepage';
import { getCurrentUser } from '../../REST-API/auth/AuthProvider';


const HomePage = () => {
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Save the user in local storage
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('No user found on local storage, kindly login or register a new user !!');
    }
  }, []);
  return (

    <Box>


      <Landing />


    </Box>

  );
};

export default HomePage;
