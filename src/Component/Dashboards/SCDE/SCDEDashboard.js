import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
import SchoolsTable from "./Schooldata";
import EventIcon from "@mui/icons-material/Event";




const Dashboard = () => {
  const cardContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "lightgreen",
    padding: "10px",
    width: "50%",
  };

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Trees Planted",
        data: [20, 40, 35, 45, 30, 50, 15, 67, 17, 50, 29, 47],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        // borderWidth: 0,
      },
      {
        label: "Target Trees",
        data: [25, 40, 40, 50, 35, 60, 40, 100, 30, 50, 80, 50],
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        // borderWidth: 0,
      },
    ],
  };

  const chartStyles = {
  width: "100%", // Set a default width
  height: "50vh", // Set a default height
  marginBottom: "50px",
};
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000) // Set default date to yesterday
  );

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const setDate = (date) => {
    setSelectedDate(date);
  };

  const handleDateClick = () => {
    setDatePickerOpen(true);
  };

  const handleDatePickerChange = (newDate) => {
    setSelectedDate(newDate);
    setDatePickerOpen(false);
  };


  return (


    <Container
      sx={{ maxWidth: "100%" }}
      maxWidth={false}
      className="dashboard"
      marginTop="auto"
      style={{ backgroundColor: "white" }}
    >
      <h2>Dashboard</h2>
      <Grid
        container
        spacing={2}
        style={{ display: "flex", justifyContent: "space-evenly", marginTop: '20px' }}
      >
        <Card className="card-stats mb-4 mb-xl-0" style={{ width: '20%' }}>
          <CardContent>
            <div className="col">
              <Typography variant="h5" component="h2">
                Schools
              </Typography>
              <Typography variant="h2" component="h3">
                924
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="card-stats mb-4 mb-xl-0" style={{ width: '20%' }}>
          <CardContent>
            <div className="col">
              <Typography variant="h5" component="h2">
                Trees planted 
              </Typography>
              <Typography variant="h5" component="h2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" component="h2" style={{ marginRight: '8px' }}>
                    {selectedDate.toLocaleDateString()}
                  </Typography>
                  <IconButton color="primary" onClick={handleDateClick}>
                    <EventIcon />
                  </IconButton>
                  {datePickerOpen && (
                    <DatePicker
                      renderInput={(props) => <TextField {...props} variant="outlined" />}
                      value={selectedDate}
                      onChange={(newDate) => handleDatePickerChange(newDate)}
                      onClose={() => setDatePickerOpen(false)}
                      open={datePickerOpen}
                    />
                  )}
                </div>
              </Typography>
              <Typography variant="h2" component="h3">
                423
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="card-stats mb-4 mb-xl-0" style={{ width: '20%' }}>
          <CardContent>
            <div className="col">
              <Typography variant="h5" component="h2">
                Trees
              </Typography>
              <Typography variant="h2" component="h3">
                924
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="card-stats mb-4 mb-xl-0" style={{ width: '20%' }}>
          <CardContent>
            <div className="col">
              <Typography variant="h5" component="h2">
                Trees
              </Typography>
              <Typography variant="h2" component="h3">
                924
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <div>
        <SchoolsTable />
      </div>

      <div
  sx={{
    ...chartStyles,
    "@media (max-width: 600px)": {
      /* Styles for small screens */
      height: "300px",
    },
    "@media (min-width: 601px) and (max-width: 960px)": {
      /* Styles for medium screens */
      height: "400px",
    },
    "@media (min-width: 961px)": {
      /* Styles for large screens */
      width: "70%",
      height: "50vh",
    },
  }}
>
<Bar data={chartData} options={{ scales: { x: { display: false }, y: { display: false } } }} />
</div>

      
    </Container>
  );
};

export default Dashboard;
