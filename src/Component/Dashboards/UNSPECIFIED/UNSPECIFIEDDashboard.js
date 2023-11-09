import React, { useState } from "react";
import {
  Container,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Container
      sx={{
        backgroundColor: "white",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Introducing Elimu Trees on your User Dashboard! We are thrilled to bring
        you an opportunity to foster green, thriving environments within
        schools. Elimu Trees is our innovative initiative that encourages the
        planting of trees in educational institutions. Just like knowledge,
        trees also grow and flourish, and with each tree planted, you contribute
        not only to a greener planet but also to the growth of future
        generations.
      </Typography>
    </Container>
  );
};

export default Dashboard;
