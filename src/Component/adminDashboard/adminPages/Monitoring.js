import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  Box,
  Grid,
  TablePagination,
} from '@material-ui/core';

const Monitoring = () => {
  const [overallData, setOverallData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [countiesData, setCountiesData] = useState([]);
  const [subcountiesData, setSubcountiesData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCounty, setSelectedCounty] = useState('All');
  const [selectedSubcounty, setSelectedSubcounty] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async (endpoint, stateSetter) => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        stateSetter(data);
      } catch (error) {
        console.error(`Error fetching data: ${endpoint}`, error);
      }
    };

    // Fetch overall data
    fetchData('http://localhost:8080/api/', setOverallData);

    // Fetch regions data
    fetchData('http://localhost:8080/api/regions', setRegionsData);

    // Fetch counties data
    fetchData('http://localhost:8080/api/counties', setCountiesData);

    // Fetch subcounties data
    fetchData('http://localhost:8080/api/subcounties', setSubcountiesData);

    // Fetch schools data
    fetchData('http://localhost:8080/api/schools', setSchoolsData);
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
  };

  const handleSubcountyChange = (event) => {
    setSelectedSubcounty(event.target.value);
  };

  const renderTable = (data, title) => (
    <Grid item xs={12} md={6}>
      <Box p={2}>
        <h2>{title}</h2>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                {title !== 'Overall' && <TableCell>Name</TableCell>}
                <TableCell>Woodlot Trees Alive</TableCell>
                <TableCell>Fruit Trees Alive</TableCell>
                <TableCell>Total Alive Trees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  {title !== 'Overall' && <TableCell>{row.area}</TableCell>}
                  <TableCell>{row.woodlotTrees}</TableCell>
                  <TableCell>{row.aliveFruitTrees}</TableCell>
                  <TableCell>{row.aliveTrees}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(_, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </Grid>
  );


  return (
    <Box bgcolor="white" p={3} border={1} borderColor="grey.200">
      <h1>Tree Monitoring</h1>
      {/* <div>
        <Select
          value={selectedRegion}
          onChange={handleRegionChange}
          label="Region"
        >
          <MenuItem value="All">All Regions</MenuItem>
          {regionsData.map((region) => (
            <MenuItem key={region.id} value={region.name}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedCounty}
          onChange={handleCountyChange}
          label="County"
        >
          <MenuItem value="All">All Counties</MenuItem>
          {countiesData.map((county) => (
            <MenuItem key={county.id} value={county.name}>
              {county.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedSubcounty}
          onChange={handleSubcountyChange}
          label="Subcounty"
        >
          <MenuItem value="All">All Subcounties</MenuItem>
          {subcountiesData.map((subcounty) => (
            <MenuItem key={subcounty.id} value={subcounty.name}>
              {subcounty.name}
            </MenuItem>
          ))}
        </Select>
      </div> */}

      <Grid container spacing={3}>
        {renderTable(overallData, 'Overall')}
        {renderTable(regionsData, 'Region')}
        {renderTable(countiesData, 'County')}
        {renderTable(subcountiesData, 'Subcounty')}
        {renderTable(schoolsData, 'School')}
      </Grid>
    </Box>
  );
};

export default Monitoring;
