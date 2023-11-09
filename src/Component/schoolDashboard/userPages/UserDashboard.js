import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';


const UserDashboard = () => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('YOUR_API_ENDPOINT')
      .then((response) => {
        setChartData(response.data); // Assuming the response is an array of data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <Container
    sx={{ maxWidth: '100%' }} maxWidth={false}
    style={{ background: "#fff", padding: "20px", margin:'auto', height:'100vh', width:'auto' }}
      // sx={{
      //   backgroundColor: 'white',
      //   p: 4,
      // }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Introducing Elimu Trees on your User Dashboard! We are thrilled to bring you an opportunity to foster green, thriving environments within schools. Elimu Trees is our innovative initiative that encourages the planting of trees in educational institutions. Just like knowledge, trees also grow and flourish, and with each tree planted, you contribute not only to a greener planet but also to the growth of future generations.
      </Typography>
      <Typography variant="body1" paragraph>
        Your User Dashboard is now your platform for nurturing these seeds of change. Monitor your tree-planting progress, celebrate the positive impact on schools, and watch as your efforts lead to a more sustainable and beautiful educational ecosystem. Elimu Trees on your Dashboard is a reminder that education and nature go hand in hand, fostering a brighter, more sustainable future for us all.
      </Typography>


      <BarChart width={1800} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="targetTrees" stackId="a"  />
        <Bar dataKey="treesPlanted" stackId="a"  />
      </BarChart>
    </Container>
  );
};

export default UserDashboard;
