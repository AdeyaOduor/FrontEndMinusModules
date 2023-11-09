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
} from '@material-ui/core';

const PlantedTrees = () => {
  const [plantedTreeData, setPlantedTreeData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCounty, setSelectedCounty] = useState('All');
  const [selectedSubcounty, setSelectedSubcounty] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState('All');

  useEffect(() => {
    // Fetch regions, counties, subcounties, and schools from your backend API
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/regions');
        const data = await response.json();
        console.log('Fetched regions:', data);
        setRegions(data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    const fetchCounties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/counties');
        const data = await response.json();
        setCounties(data);
      } catch (error) {
        console.error('Error fetching counties:', error);
      }
    };

    const fetchSubcounties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/subcounties');
        const data = await response.json();
        setSubcounties(data);
      } catch (error) {
        console.error('Error fetching subcounties:', error);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/schools');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    // Fetch planted tree data from your backend API
    const fetchPlantedTreeData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/planted-trees');
        const data = await response.json();
        setPlantedTreeData(data);
      } catch (error) {
        console.error('Error fetching planted tree data:', error);
      }
    };

    // Call the functions to fetch regions, counties, subcounties, schools, and planted tree data
    fetchRegions();
    fetchCounties();
    fetchSubcounties();
    fetchSchools();
    fetchPlantedTreeData();
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

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const filteredData = plantedTreeData.filter(
    (tree) =>
      (selectedRegion === 'All' || tree.region === selectedRegion) &&
      (selectedCounty === 'All' || tree.county === selectedCounty) &&
      (selectedSubcounty === 'All' || tree.subcounty === selectedSubcounty) &&
      (selectedSchool === 'All' || tree.school === selectedSchool)
  );

  return (
    <Box p={3} bgcolor="white" style={{ padding: '20px' }}>
      <h1>Planted Trees</h1>
      {/* <div>
        <Select
          value={selectedRegion}
          onChange={handleRegionChange}
          label="Region"
        >
          <MenuItem value="All">All Regions</MenuItem>
          {regions.map((region) => (
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
          {counties.map((county) => (
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
          {subcounties.map((subcounty) => (
            <MenuItem key={subcounty.id} value={subcounty.name}>
              {subcounty.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedSchool}
          onChange={handleSchoolChange}
          label="School"
        >
          <MenuItem value="All">All Schools</MenuItem>
          {schools.map((school) => (
            <MenuItem key={school.id} value={school.name}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </div> */}

      {/* Overall Trees Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h2>Overall Trees</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Total Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{plantedTreeData.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Region Data Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h2>Region Data</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>Total Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(regions ?? []).length > 0 ? (
              regions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell>{region.name}</TableCell>
                  <TableCell>
                    {
                      plantedTreeData.filter(
                        (tree) => tree.region === region.name
                      ).length
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No regions available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>





      {/* County Data Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h2>County Data</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>County</TableCell>
              <TableCell>Total Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(counties ?? []).length > 0 ? (
              counties.map((county) => (
                <TableRow key={county.id}>
                  <TableCell>{county.name}</TableCell>
                  <TableCell>
                    {
                      plantedTreeData.filter(
                        (tree) => tree.county === county.name
                      ).length
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No counties available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Subcounty Data Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h2>Subcounty Data</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subcounty</TableCell>
              <TableCell>Total Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcounties?.length > 0 ? (
              subcounties.map((subcounty) => (
                <TableRow key={subcounty.id}>
                  <TableCell>{subcounty.name}</TableCell>
                  <TableCell>
                    {
                      plantedTreeData.filter(
                        (tree) => tree.subcounty === subcounty.name
                      ).length
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No subcounties available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      {/* School Data Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h2>School Data</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Total Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(schools) && schools.length > 0 ? (
              schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>
                    {
                      plantedTreeData.filter(
                        (tree) => tree.school === school.name
                      ).length
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No schools available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
};

export default PlantedTrees;
