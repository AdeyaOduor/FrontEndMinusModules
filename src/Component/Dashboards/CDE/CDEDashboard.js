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



const CDEDashboard = () => {
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
      },
      {
        label: "Target Trees",
        data: [25, 40, 40, 50, 35, 60, 40, 100, 30, 50, 80, 50],
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
      },
    ],
  };

  const chartStyles = {
    width: "70%",
    innerHeight: "50vh",
    marginBottom: "50px",
  };
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000) // Set default date to yesterday
  );

  const [datePickerOpen, setDatePickerOpen] = useState(false);

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
      <Grid item lg={6} xl={3} style={{ display: 'flex', justifyContent: "space-evenly" , marginTop: '20px'}}>
        <Card className="card-stats mb-4 mb-xl-0" style={{ width: '20%' }}>
          <CardContent>
            <div className="col">
              <Typography variant="h5" component="h2">
                Users
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
              onChange={handleDatePickerChange}
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

      <div style={chartStyles}>
        <Bar data={chartData} />
      </div>

     
    </Container>
  );
};

export default CDEDashboard;
