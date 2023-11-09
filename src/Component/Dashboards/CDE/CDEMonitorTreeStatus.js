import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextareaAutosize,
  Typography,
  DialogActions,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";
import { styled } from "@mui/system";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import Camera from "../../Camera";
import { Link } from "react-router-dom";

const FormContainer = styled(Container)({
  maxWidth: "300px",
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px solid #dddddd",
  padding: "20px",
  marginTop: "1rem",
  backgroundColor: "white",
  fontSize: "16px",

  "@media (max-width: 600px)": {
    fontSize: "8px",
    maxWidth: "100%",
    padding: "2px",
    margin: "0",
    marginTop: "10px",
    // backgroundColor: "white",
  },

  "@media (min-width: 601px) and (max-width: 960px)": {
    fontSize: "12px",
    padding: "0",
    margin: "0",
  },
});

const TableContainerStyled = styled(TableContainer)({
  border: "1px solid #dddddd",
  backgroundColor: "white",
  fontSize: "16px",
});

function MonitorTreeStatus({ onSave, onCloseForm }) {
  const [monitoringDate, setDateOfMonitoring] = useState("");
  const [participants, setNumParticipants] = useState("");
  const [woodTreesAlive, setNumWoodlotTreesAlive] = useState("");
  const [fruitTreesAlive, setNumFruitTreesAlive] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleStatusSubmit = async () => {
    // Ensure number fields do not go below zero
    const numParticipantsValue = Math.max(0, participants);
    const numWoodlotTreesAliveValue = Math.max(0, woodTreesAlive);
    const numFruitTreesAliveValue = Math.max(0, fruitTreesAlive);

    const formData = new FormData();
    formData.append("monitoringDate", monitoringDate);
    formData.append("participants", numParticipantsValue);
    formData.append("woodTreesAlive", numWoodlotTreesAliveValue);
    formData.append("fruitTreesAlive", numFruitTreesAliveValue);
    formData.append("description", description);
    formData.append("image", image);

    // Send the data to the server (replace the URL with your API endpoint)
    const response = await fetch(
      "http://localhost:8080/api/v1/treeMonitoring/create?plantingSessionId=1",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      onSave(responseData);
    }

    setDateOfMonitoring("");
    setNumParticipants("");
    setNumWoodlotTreesAlive("");
    setNumFruitTreesAlive("");
    setDescription("");
    setImage(null);

    onCloseForm();
  };

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleButtonClick = () => {
    setIsCameraOpen(true);
  };
  const handleCloseButton = () => {
    setIsCameraOpen(false);
  };

  const handleCaptureImage = (imageData) => {};

  return (
    <Container style={{ background: "##f5e4e4", padding: "20px" }}>
      <FormContainer style={{ background: "#e0e0e0", padding: "20px" }}>
        <form>
          <TextField
            name="dateOfMonitoring"
            label="Date of Monitoring"
            type="date"
            fullWidth
            value={monitoringDate}
            onChange={(e) => setDateOfMonitoring(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            name="numParticipants"
            label="Number of Participants"
            type="number"
            fullWidth
            value={participants}
            onChange={(e) => setNumParticipants(Math.max(0, e.target.value))}
            required
          />
          <TextField
            name="numWoodlotTreesAlive"
            label="Number of Woodlot Trees Alive"
            type="number"
            fullWidth
            value={woodTreesAlive}
            onChange={(e) =>
              setNumWoodlotTreesAlive(Math.max(0, e.target.value))
            }
            required
          />
          <TextField
            name="numFruitTreesAlive"
            label="Number of Fruit Trees Alive"
            type="number"
            fullWidth
            value={fruitTreesAlive}
            onChange={(e) => setNumFruitTreesAlive(Math.max(0, e.target.value))}
            required
          />
          <TextareaAutosize
            name="description"
            rowsMin={6}
            placeholder="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: "16px", width: "100%", minHeight: "100px" }}
            required
          />

          {/* <Grid
            item
            xs={12}
            sm={6}
            lg={6}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "1px",
              marginTop: "20px",
            }}
          > */}
            {/* <Grid > */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            > */}
              {/* {isCameraOpen ? (
                <div>
                  <Button
                    onClick={handleCloseButton}
                    style={{ marginBottom: "10px", float: "right" }}
                  >
                    <CloseIcon />
                  </Button>
                  <Camera onCapture={handleCaptureImage} />
                </div>
              ) : (
                <Button onClick={handleButtonClick}>
                  <Box display="flex" alignItems="center">
                    <PhotoCameraIcon
                      style={{
                        marginRight: "5px",
                        width: "40px",
                        height: "30px",
                        color: "black",
                      }}
                    />
                    <label style={{ color: "black" }}>Take Photo </label> */}
                    {/* <h4>Take Photo</h4> */}
                  {/* </Box>
                </Button>
              )}
            </div>
          </Grid> */}

          {/* </Grid> */}
          {/* <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "16px" }}
            required
          /> */}

          <Button
            variant="contained"
            color="warning"
            onClick={handleStatusSubmit}
            style={{ marginTop: "16px" }}
          >
            Save
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
}

function CDEMonitoringPage() {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = (formData) => {
    setData([...data, formData]);
  };

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:8080/api/v1/treeMonitoring/read?plantingSessionId=1"
    );
    if (response.ok) {
      const monitoringData = await response.json();
      setData(monitoringData);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const TableStyled = styled(Table)({
    border: "1px solid #dddddd",
    "& th, & td": {
      fontSize: "16px",
      padding: "8px",
    },
    "@media (max-width: 600px)": {
      "& th, & td": {
        fontSize: "8px",
        padding: "1px",
      },
    },
  });

  const TableCellStyled = styled(TableCell)({
    border: "1px solid #dddddd",
    "&.image-cell": {
      width: "50px",
      "@media (max-width: 600px)": {
        width: "20px",
      },
    },
  });

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleButtonClick = () => {
    setIsCameraOpen(true);
  };
  const handleCloseButton = () => {
    setIsCameraOpen(false);
  };

  const handleCaptureImage = (imageData) => {};

  return (
    <Container
      style={{ background: "#e0e0e0", padding: "20px", marginLeft: "auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={() => setIsFormOpen(true)}
          style={{ margin: "1rem 0" }}
        >
          Capture Monitoring
        </Button>
        {isFormOpen && (
          <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
            <DialogTitle style={{ color: "orange", textAlign: "center" }}>
              Add Monitoring Data
            </DialogTitle>
            <DialogContent>
              <MonitorTreeStatus
                onSave={handleFormSubmit}
                onCloseForm={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCellStyled>Date of Monitoring</TableCellStyled>
              <TableCellStyled>Number of Participants</TableCellStyled>
              <TableCellStyled>Number of Woodlot Trees Alive</TableCellStyled>
              <TableCellStyled>Number of Fruit Trees Alive</TableCellStyled>
              <TableCellStyled>Description</TableCellStyled>
              <TableCellStyled onClick={handleOpenPopup}>
                Upload Image
              </TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCellStyled>{item.monitoringDate}</TableCellStyled>
                <TableCellStyled>{item.participants}</TableCellStyled>
                <TableCellStyled>{item.woodTreesAlive}</TableCellStyled>
                <TableCellStyled>{item.fruitTreesAlive}</TableCellStyled>
                <TableCellStyled>{item.description}</TableCellStyled>
                <TableCellStyled>
                  {item.upload && (
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt="Img"
                      style={{ width: "50px" }}
                    />
                  )}
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>

      <Dialog
        open={isPopupOpen}
        onClose={handleClosePopup}
        aria-labelledby="popup-dialog-title"
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle id="popup-dialog-title" color="BROWN">
          Choose an option
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {isCameraOpen ? (
                  <div>
                    <Button
                      onClick={handleCloseButton}
                      style={{ marginBottom: "10px", float: "right" }}
                    >
                      <CloseIcon />
                    </Button>
                    <Camera
                      onCapture={() =>
                        handleCaptureImage(
                          new Date().toLocaleString("en-US", {
                            timeZone: "Africa/Nairobi",
                          })
                        )
                      }
                    />
                  </div>
                ) : (
                  <Button onClick={handleButtonClick}>
                    <Box display="flex" alignItems="center">
                      <PhotoCameraIcon
                        style={{
                          marginRight: "5px",
                          width: "40px",
                          height: "30px",
                          color: "black",
                        }}
                      />
                      <label style={{ color: "black" }}>Take Photo </label>
                    </Box>
                  </Button>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: "30px",
              }}
            >
              <Typography
                color="textSecondary"
                variant="body1"
                alignItems="center"
              >
                <Link to="/app/statusmonitoring">Status Monitoring</Link>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="warning">
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CDEMonitoringPage;
