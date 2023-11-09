import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Paper } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Region 1', target: 400, planted: 240, monitoring: 340 },
  { name: 'Region 2', target: 300, planted: 139, monitoring: 221 },
  { name: 'Region 3', target: 200, planted: 980, monitoring: 321 },
  // Add more data as needed
];

const Dashboard = () => {
  const dashboardStyle = {
    backgroundColor: '#fff', // Set the background color to white
    padding: 16, // Add some padding for spacing
  };
  return (
    <div style={dashboardStyle}>
      <h1>Admin Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Target Trees
              </Typography>
              <Typography variant="h3">
                2,400
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Planted Trees
              </Typography>
              <Typography variant="h3">
                1,340
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monitoring
              </Typography>
              <Typography variant="h3">
                2,212
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ padding: 16, marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>
          Target vs. Planted vs. Monitoring Trees
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="target" fill="#8884d8" name="Target Trees" />
            <Bar dataKey="planted" fill="#82ca9d" name="Planted Trees" />
            <Bar dataKey="monitoring" fill="#ffc658" name="Monitoring" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default Dashboard;