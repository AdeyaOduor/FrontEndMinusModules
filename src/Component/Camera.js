import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button, Grid, IconButton } from "@material-ui/core";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function App() {
  const webRef = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);

  const getCoordinates = (position) => {
    console.log("Position:", position);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getCoordinates(position);
          setGeolocationEnabled(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Geolocation error. Please check the console for details.");
          setGeolocationEnabled(false);
        }
      );
    } else {
      alert("Geolocation is not supported in your browser.");
      setGeolocationEnabled(false);
    }
  };

  const convertToBuffer = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(xhr.response);
        } else {
          reject(new Error("Failed to load image"));
        }
      };
  
      xhr.onerror = reject;
      xhr.send();
    });
  };

  const postImageToDatabase = async (imageBlob, fileName) => {
    const formData = new FormData();
    formData.append("image", imageBlob, fileName);
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/plantingSession/upload?imageUpload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Image posted to database");
  
        // Fetch the image from the database
        const fetchResponse = await fetch(`http://localhost:8080/api/v1/plantingSession/images/${fileName}`);
        if (fetchResponse.ok) {
          const imageData = await fetchResponse.blob();
          setImage(URL.createObjectURL(imageData));
        } else {
          console.error("Failed to fetch image from the database");
        }
      } else {
        console.error("Failed to post image to database");
      }
    } catch (error) {
      console.error("Failed to post image to database:", error);
    }
  };

  const captureImage = async () => {
    if (cameraOpen) {
      const imageSrc = webRef.current.getScreenshot();
  
      if (geolocationEnabled) {
        const buffer = await convertToBuffer(imageSrc);
        const updatedImageBlob = new Blob([buffer], { type: "image/jpeg" });
        const currentDate = new Date();
        const dateAndTime = currentDate.toISOString();
        const fileName = `${dateAndTime}_Lat_${latitude}_Lon_${longitude}.jpeg`;
        const imageType = imageSrc.type || 'image/jpeg';


        await postImageToDatabase(updatedImageBlob, fileName);
  
        setImage(URL.createObjectURL(updatedImageBlob));
        setCameraOpen(false);

  
        // Log image details including latitude, longitude, date, time, and image type
        console.log("Image details:");
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("Date and Time:", dateAndTime);
        console.log("Image Type:", imageType);
      } else {
        alert("Please enable location access to capture the image and coordinates.");
      }
    }
  };
 

  const openCamera = () => {
    setImage(null);
    setCameraOpen(true);
  };

  
  const webcamStyle = {
    width: "100%",
    height: "auto",
  };

  const capturedImageStyle = {
    width: "100%", 
    height: "auto",
  };

  return (
    <div className="App" width='100%'>
      {cameraOpen ? (
        <Webcam
          audio={false}
          ref={webRef}
          screenshotFormat="image/jpeg"
          style={webcamStyle}
        />
      ) : (
        <img
          src={image}
          alt="Turn on Location and Retake photo"
          style={capturedImageStyle}
        />
      )}
      <Grid style={{display: 'flex', flexDirection:'row', width: '100% important!'}}>
      <IconButton onClick={() => (cameraOpen ? captureImage() : openCamera())}>
        Click
      </IconButton>
      <Button onClick={getGeolocation}> <LocationOnIcon/>Turn on location</Button>
      
      </Grid>
      {!geolocationEnabled && <p>Please enable location access on your device to capture the image.</p>}
     
    </div>
  );
}