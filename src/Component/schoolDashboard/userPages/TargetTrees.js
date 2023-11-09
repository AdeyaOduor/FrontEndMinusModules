// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Paper,
//   Container,
//   TextField,
//   TextareaAutosize,
//   Grid,
// } from "@material-ui/core";
// import { styled } from "@mui/system";


// const TableContainerStyled = styled(TableContainer)({
//   border: "1px solid #dddddd",
//   background: "white",
// });
// const TableStyled = styled(Table)({
//   border: "1px solid #dddddd",
//   "& th, & td": {
//     fontSize: "16px",
//     padding: "8px", 

//   },
//   "@media (max-width: 600px)": {
//     "& th, & td": {
//       fontSize: "8px", 
//       padding: "1px", 
//     },
//   },
// });

// const TableCellStyled = styled(TableCell)({
//   border: "1px solid #dddddd",
//   "&.image-cell": {
//     width: "50px", 
//     "@media (max-width: 600px)": {
//       width: "20px", 
//     },
//   },
// });

// function TargetTrees() {
//   const [formData, setFormData] = useState({
//     learners: "",
//     staff: "",
//     woodTrees: "",
//     fruitTrees: "",
//     targetArea: "",
//     description: "",
//     image: null,
//   });

//   const [targets, setTargets] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   // const [isCameraOpen, setIsCameraOpen] = useState(false);


//   const handleSaveTarget = (data) => {
//     axios
//       .post(
//         "http://localhost:8080/api/v1/targets/create?userIdentifierId=1",
//         data
//       )
//       .then((response) => {
//         setTargets([...targets, response.data]);
//         // Clear the form
//         setFormData({
//           learners: "",
//           staff: "",
//           woodTrees: "",
//           fruitTrees: "",
//           targetArea: "",
//           description: "",
//           image:"",
//         });
//         // close the form
//         setIsFormVisible(false);
//         fetchTargetData();
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//       });
//   };

//   const fetchTargetData = () => {
//     axios
//       .get("http://localhost:8080/api/v1/targets/readByUser?userIdentifierId=1")
//       .then((response) => {
//         setTargets(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchTargetData();
//   }, []);

//   // const handleCaptureImage = (imageData) => {
//   //   setFormData({ ...formData, image: imageData });
//   //   setIsCameraOpen(false); // Close the camera after capturing
//   // };

  

//   return (
//     <Container  sx={{ maxWidth: '100%' }} maxWidth={false}
//     style={{ background: "#fff", padding: "20px", margin:'auto', height:'100vh', width:'auto' }}>
//       <section style={{ background: "#e0e0e0", padding: "20px", width:'100%' }}>
//         <Button
//           variant="contained"
//           color="warning"
//           onClick={() => setIsFormVisible(true)}
//           style={{ marginBottom: "16px" }}
//         >
//           Tree Targets
//         </Button>
//         {isFormVisible && (
//           <form>
//             <Grid container spacing={3}>
//             <Grid item xs={12} sm={6} lg={6}>
//                 <TextField
//                   name="learners"
//                   label="Number of Learners"
//                   type="number"
//                   fullWidth
//                   value={formData.learners}
//                   onChange={(e) =>
//                     setFormData({ ...formData, learners: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} lg={6}>
//                 <TextField
//                   name="staff"
//                   label="Number of Staff"
//                   type="number"
//                   fullWidth
//                   value={formData.staff}
//                   onChange={(e) =>
//                     setFormData({ ...formData, staff: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} lg={6}>
//                 <TextField
//                   name="woodTrees"
//                   label="Number of Woodlot Trees"
//                   type="number"
//                   fullWidth
//                   value={formData.woodTrees}
//                   onChange={(e) =>
//                     setFormData({ ...formData, woodTrees: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} lg={6}>
//                 <TextField
//                   name="fruitTrees"
//                   label="Number of Fruit Trees"
//                   type="number"
//                   fullWidth
//                   value={formData.fruitTrees}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fruitTrees: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} lg={6}>
//                 <TextField
//                   name="targetArea"
//                   label="Total Allocated Area (Hectares)"
//                   type="number"
//                   fullWidth
//                   value={formData.targetArea}
//                   onChange={(e) =>
//                     setFormData({ ...formData, targetArea: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} lg={6}>
//                 <TextareaAutosize
//                   name="description"
//                   rowsMin={6}
//                   placeholder="Description"
//                   fullWidth
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   style={{
//                     marginTop: "16px",
//                     width: "100%",
//                     minHeight: "100px",
//                   }}
//                   required
//                 />
//               </Grid>

//               {/* <Grid item xs={12} sm={6} lg={6}>
//               <Camera/> 
//                 <Button onClick={() => setIsCameraOpen(true)}>Open Camera </Button>
//                 {isCameraOpen && (
//                   <camera onCapture={handleCaptureImage} onClose={() => setIsCameraOpen(false)} />
//                 )}
//               </Grid> */}

//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="warning"
//                   onClick={() => handleSaveTarget(formData)}
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => setIsFormVisible(false)}
//                   style={{ marginLeft: "8px" }}
//                 >
//                   Close
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </section>
//       <section style={{ background: "#ffffff", padding: "20px", width:'100%' }}>
//         <TableContainerStyled component={Paper}>
//           <TableStyled>
//             <TableHead>
//               <TableRow>
//                 <TableCellStyled>Number of Learners</TableCellStyled>
//                 <TableCellStyled>Number of Staff</TableCellStyled>
//                 <TableCellStyled>Number of Woodlot Trees</TableCellStyled>
//                 <TableCellStyled>Number of Fruit Trees</TableCellStyled>
//                 <TableCellStyled>Total Allocated Area (Hectares)</TableCellStyled>
//                 <TableCellStyled>Description</TableCellStyled>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {targets.map((target, index) => (
//                 <TableRow key={index}>
//                   <TableCellStyled>{target.learners}</TableCellStyled>
//                   <TableCellStyled>{target.staff}</TableCellStyled>
//                   <TableCellStyled>{target.woodTrees}</TableCellStyled>
//                   <TableCellStyled>{target.fruitTrees}</TableCellStyled>
//                   <TableCellStyled>{target.targetArea}</TableCellStyled>
//                   <TableCellStyled>{target.description}</TableCellStyled>
//                 </TableRow>
//               ))}
//               {targets.length === 0 && (
//                 <TableRow>
//                   <TableCellStyled colSpan={6}>
//                     No data available. Please add targets using the form above.
//                   </TableCellStyled>
//                 </TableRow>
//               )}
//             </TableBody>
//           </TableStyled>
//         </TableContainerStyled>
//       </section>
//     </Container>
//   );
// }

// export default TargetTrees;

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
  Paper,
  Container,
  TextField,
  TextareaAutosize,
  Grid,
} from "@material-ui/core";
import { styled } from "@mui/system";

const TableContainerStyled = styled(TableContainer)({
  border: "1px solid #dddddd",
  background: "white",
});
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

function TargetTrees({onSave, onCloseForm}) {
  const [formData, setFormData] = useState({
    learners: "",
    staff: "",
    woodTrees: "",
    fruitTrees: "",
    targetArea: "",
    description: "",
  });

  const [targets, setTargets] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formdata = new FormData();
  formData.append("learners", formData.learners); 
  formData.append("staff", formData.staff); 
  formData.append("woodtrees", formData.woodTrees); 
  formData.append("fruitTrees", formData.fruitTrees);
  formData.append("targetArea", formData.targetArea); 
  formData.append("description", formData.description);

  const handleSaveTarget = (data) => {
    axios
      .post(
        "http://localhost:8080/api/v1/targets/create?userIdentifierId=1",
        data
      )
      .then((response) => {
        if (response.status === 200) {
          response.json().then(function (responseData){
            onSave(responseData);
          })
          // Data saved successfully
          // Fetch the updated data from the backend
          fetchTargetData();
        } else {
          console.error("Error saving data. Status code: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const fetchTargetData = () => {
    axios
      .get("http://localhost:8080/api/v1/targets/readByUser?userIdentifierId=1")
      .then((response) => {
        setTargets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchTargetData();
  }, []);

  return (
    <Container
      sx={{ maxWidth: "100%" }}
      maxWidth={false}
      style={{ background: "#fff", padding: "20px", margin: "auto", height: "100vh", width: "auto" }}
    >
      <section style={{ background: "#e0e0e0", padding: "20px", width: "100%" }}>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setIsFormVisible(true)}
          style={{ marginBottom: "16px" }}
        >
          Tree Targets
        </Button>
        {isFormVisible && (
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  name="learners"
                  label="Number of Learners"
                  type="number"
                  fullWidth
                  value={formData.learners}
                  onChange={(e) =>
                    setFormData({ ...formData, learners: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  name="staff"
                  label="Number of Staff"
                  type="number"
                  fullWidth
                  value={formData.staff}
                  onChange={(e) =>
                    setFormData({ ...formData, staff: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  name="woodTrees"
                  label="Number of Woodlot Trees"
                  type="number"
                  fullWidth
                  value={formData.woodTrees}
                  onChange={(e) =>
                    setFormData({ ...formData, woodTrees: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  name="fruitTrees"
                  label="Number of Fruit Trees"
                  type="number"
                  fullWidth
                  value={formData.fruitTrees}
                  onChange={(e) =>
                    setFormData({ ...formData, fruitTrees: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  name="targetArea"
                  label="Total Allocated Area (Hectares)"
                  type="number"
                  fullWidth
                  value={formData.targetArea}
                  onChange={(e) =>
                    setFormData({ ...formData, targetArea: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextareaAutosize
                  name="description"
                  rowsMin={6}
                  placeholder="Description"
                  fullWidth
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    minHeight: "100px",
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleSaveTarget(formData)}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsFormVisible(false)}
                  style={{ marginLeft: "8px" }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </section>
      <section style={{ background: "#ffffff", padding: "20px", width: "100%" }}>
        <TableContainerStyled component={Paper}>
          <TableStyled>
            <TableHead>
              <TableRow>
                <TableCellStyled>Number of Learners</TableCellStyled>
                <TableCellStyled>Number of Staff</TableCellStyled>
                <TableCellStyled>Number of Woodlot Trees</TableCellStyled>
                <TableCellStyled>Number of Fruit Trees</TableCellStyled>
                <TableCellStyled>Total Allocated Area (Hectares)</TableCellStyled>
                <TableCellStyled>Description</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {targets.map((target, index) => (
                <TableRow key={index}>
                  <TableCellStyled>{target.learners}</TableCellStyled>
                  <TableCellStyled>{target.staff}</TableCellStyled>
                  <TableCellStyled>{target.woodTrees}</TableCellStyled>
                  <TableCellStyled>{target.fruitTrees}</TableCellStyled>
                  <TableCellStyled>{target.targetArea}</TableCellStyled>
                  <TableCellStyled>{target.description}</TableCellStyled>
                </TableRow>
              ))}
              {targets.length === 0 && (
                <TableRow>
                  <TableCellStyled colSpan={6}>
                    No data available. Please add targets using the form above.
                  </TableCellStyled>
                </TableRow>
              )}
            </TableBody>
          </TableStyled>
        </TableContainerStyled>
      </section>
    </Container>
  );
}

export default TargetTrees;
