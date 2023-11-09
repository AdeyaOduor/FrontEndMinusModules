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
} from '@material-ui/core';

const TargetTrees = () => {
  const [targetTreeData, setTargetTreeData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCounty, setSelectedCounty] = useState('All');
  const [selectedSubcounty, setSelectedSubcounty] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState('All');

  useEffect(() => {
    // Initialize targetTreeData as an empty array
    setTargetTreeData([]);

    // Fetch regions, counties, subcounties, and schools from your backend API
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/regions'); // Replace with your actual API endpoint
        const data = await response.json();
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
        const response = await fetch('http://localhost:8080/api/v1/targets/getBySubCountyId');
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

    const fetchTargetTreeData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/targets/');
        const data = await response.json();
        setTargetTreeData(data);
      } catch (error) {
        console.error('Error fetching target tree data:', error);
      }
    };

    fetchRegions();
    fetchCounties();
    fetchSubcounties();
    fetchSchools();
    fetchTargetTreeData();
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

  // Calculate overall totals
  const overallTotal = Array.isArray(targetTreeData)
    ? targetTreeData.reduce((acc, tree) => acc + (tree.target || 0), 0)
    : 0;

  return (
    <Box bgcolor="white" p={3}>
      <h1>Target Trees</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Overall</TableCell>
                  <TableCell>Target Trees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Overall</TableCell>
                  <TableCell>{overallTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell>Target Trees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetTreeData
                  .filter((tree) =>
                    selectedRegion === 'All' ? true : tree.region === selectedRegion
                  )
                  .map((tree) => (
                    <TableRow key={tree.id}>
                      <TableCell>{tree.region}</TableCell>
                      <TableCell>{tree.target || 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>County</TableCell>
                  <TableCell>Target Trees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(targetTreeData) && targetTreeData // Check if it's an array
                  .filter((tree) =>
                    selectedCounty === 'All' ? true : tree.county === selectedCounty
                  )
                  .map((tree) => (
                    <TableRow key={tree.id}>
                      <TableCell>{tree.county}</TableCell>
                      <TableCell>{tree.target || 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subcounty</TableCell>
                  <TableCell>Target Trees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetTreeData
                  .filter((tree) =>
                    selectedSubcounty === 'All' ? true : tree.subcounty === selectedSubcounty
                  )
                  .map((tree) => (
                    <TableRow key={tree.id}>
                      <TableCell>{tree.subcounty}</TableCell>
                      <TableCell>{tree.target || 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>School</TableCell>
                  <TableCell>Target Trees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetTreeData
                  .filter((tree) =>
                    selectedSchool === 'All' ? true : tree.school === selectedSchool
                  )
                  .map((tree) => (
                    <TableRow key={tree.id}>
                      <TableCell>{tree.school}</TableCell>
                      <TableCell>{tree.target || 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TargetTrees;
