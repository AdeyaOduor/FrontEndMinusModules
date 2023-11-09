import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Box,

} from "@material-ui/core";
import { styled } from "@mui/system";
import Camera from '../../Camera'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Link } from 'react-router-dom';
// import  from './MonitorTreeStatus';



const TableContainerStyled = styled(TableContainer)({
  border: "1px solid #dddddd",
  background: "white",
});

const TableStyled = styled(Table)({
  border: "1px solid #dddddd",
});

const TableCellStyled = styled(TableCell)({
  border: "1px solid #dddddd",
});

function UserForm({ initialValues, onSave, onCloseForm }) {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png"];

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidExtension = allowedExtensions.includes(fileExtension);

    if (file && isValidExtension) {
      setFormData({ ...formData, image: file });
    } else {

      console.log("Please select an image in JPEG or PNG format.");
    }
  };

  const handleSave = () => {
    onSave(formData);
    onCloseForm();
  };


  // const [isCameraOpen, setIsCameraOpen] = useState(false);

  // const handleButtonClick = () => {
  //   setIsCameraOpen(true);
  // };
  // const handleCloseButton = () => {
  //   setIsCameraOpen(false);
  // };

  // const handleCaptureImage = (imageData) => {
  // };

  return (
    <Container 
    sx={{ maxWidth: '100%' }} maxWidth={false}
    style={{ background: "#fff", padding: "20px", margin:'auto'}}>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              fullWidth
              value={formData.startDate || ""}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="endDate"
              label="End Date"
              type="date"
              fullWidth
              value={formData.endDate || ""}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="targetArea"
              label="Target Area (Ha)"
              type="number"
              fullWidth
              value={formData.targetArea || ""}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="learners"
              label="Number of Learners"
              type="number"
              fullWidth
              value={formData.learners || ""}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="staff"
              label="Number of Staff"
              type="number"
              fullWidth
              value={formData.staff || ""}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="woodTrees"
              label="Number of Woodlot Seedlings"
              type="number"
              fullWidth
              value={formData.woodTrees || ""}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <TextField
              name="fruitTrees"
              label="Number of Fruit Trees Seedlings"
              type="number"
              fullWidth
              value={formData.fruitTrees || ""}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Grid>



          {/* <Grid item xs={12} sm={6} lg={6} style={{ display: 'flex', flexDirection: "row", padding: '10px', marginTop: '20px' }}>
           
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {isCameraOpen ? (
                  <div>
                    <Button onClick={handleCloseButton} style={{ marginBottom: "10px", float: 'right' }}>
                      <CloseIcon />
                    </Button>
                    <Camera onCapture={handleCaptureImage} />
                  </div>
                ) : (
                  <Button onClick={handleButtonClick} >
                    <Box display="flex" alignItems="center">
                      <PhotoCameraIcon style={{ marginRight: "5px", width: "40px", height: "30px", color: 'black' }} />
                      <label style={{ color: "black" }}>Take Photo </label>
                      {/* <h4>Take Photo</h4> */}
          {/* </Box> */}
          {/* </Button> */}
          {/* )} */}
          {/* </div> */}

          {/* <Grid> } */}

          {/* <Input
                type="file"
                name="image"
                accept="image/*"
                class="custom-file-input image-gallery"
                onChange={handleFileChange}
              /> */}
          {/* </Grid>
          </Grid> */}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={onCloseForm}
              style={{ marginLeft: "16px" }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

function CDETreePlanting() {
  const [formData, setFormData] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const openDataForm = () => {
    setOpenForm(true);
  };

  const closeDataForm = () => {
    setOpenForm(false);
  };


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

  const handleSaveUpperSection = (data) => {
    // Make a POST request to save data
    axios
      .post("http://localhost:8080/api/v1/plantingSession/create?userIdentifierId=1", data)
      .then((response) => {
        setFormData([response.data, ...formData]);
        closeDataForm();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const fetchData = () => {
    // Make a GET request to fetch data
    axios
      .get("http://localhost:8080/api/v1/plantingSession/read?userIdentifierId=1")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleCaptureImage = (imageData) => {
  };


  return (
    <Container
    sx={{ maxWidth: '100%' }} maxWidth={false}
    style={{ background: "#fff", padding: "20px", margin:'auto', height:'100vh', width:'auto' }}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={openDataForm}
        style={{ marginBottom: "16px" }}
      >
        Capture Planting
      </Button>
      {openForm && (
        <UserForm
          initialValues={{}}
          onSave={handleSaveUpperSection}
          onCloseForm={closeDataForm}
        />
      )}
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCellStyled>Start Date</TableCellStyled>
              <TableCellStyled>End Date</TableCellStyled>
              <TableCellStyled>Target Area (Ha)</TableCellStyled>
              <TableCellStyled>Number of Learners</TableCellStyled>
              <TableCellStyled>Number of Staff</TableCellStyled>
              <TableCellStyled>Number of Woodlot Seedlings</TableCellStyled>
              <TableCellStyled>Number of Fruit Trees Seedlings</TableCellStyled>
              <TableCellStyled>Description</TableCellStyled>

              {/* <TableCellStyled>Upload</TableCellStyled> */}
              <TableCellStyled onClick={handleOpenPopup} >
                Upload Image
              </TableCellStyled>
              <TableCellStyled>Latitude</TableCellStyled>
              <TableCellStyled>Longitude</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((row, index) => (
              <TableRow key={index}>
                <TableCellStyled>{row.startDate}</TableCellStyled>
                <TableCellStyled>{row.endDate}</TableCellStyled>
                <TableCellStyled>{row.targetArea}</TableCellStyled>
                <TableCellStyled>{row.learners}</TableCellStyled>
                <TableCellStyled>{row.staff}</TableCellStyled>
                <TableCellStyled>{row.woodTrees}</TableCellStyled>
                <TableCellStyled>{row.fruitTrees}</TableCellStyled>
                <TableCellStyled>{row.description}</TableCellStyled>

                <TableCellStyled>
                  {row.Upload
                    // && (
                    //   <img
                    //     src={URL.createObjectURL(row.image)}
                    //     alt="TreeImg"
                    //     style={{ width: "50px" }}
                    //   />
                    // )
                  }
                </TableCellStyled>
                <TableCellStyled>{row.latitude}</TableCellStyled>
                <TableCellStyled>{row.longitude}</TableCellStyled>
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
          style: { backgroundColor: 'white' }
        }}
      >
        <DialogTitle id="popup-dialog-title" color="BROWN">Choose an option</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6} style={{ display: 'flex', flexDirection: "row", padding: '10px', marginTop: '20px' }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {isCameraOpen ? (
                  <div>
                    <Button onClick={handleCloseButton} style={{ marginBottom: "10px", float: 'right' }}>
                      <CloseIcon />
                    </Button>
                    <Camera onCapture={() => handleCaptureImage(new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }))} />
                  </div>
                ) : (
                  <Button onClick={handleButtonClick}>
                    <Box display="flex" alignItems="center">
                      <PhotoCameraIcon style={{ marginRight: "5px", width: "40px", height: "30px", color: 'black' }} />
                      <label style={{ color: "black" }}>Take Photo </label>
                    </Box>
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} style={{ display: "flex", flexDirection: "column", textAlign: "center", padding: '30px' }}>
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


export default CDETreePlanting;
