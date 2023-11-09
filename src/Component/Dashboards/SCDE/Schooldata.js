import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
  IconButton,
  TextField,
  TablePagination,
  Button,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import * as Papa from 'papaparse';

const SchoolsTable = () => {
  const [schools, setSchools] = useState([]);
  const [filters, setFilters] = useState({
    global: '',
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const dummyData = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      rank: index + 1,
      name: `School ${index + 1}`,
      treesPlanted: 300 + Math.floor(Math.random() * 200),
      zone: `Zone ${String.fromCharCode(65 + (index % 26))}`,
    }));

    setSchools(dummyData);
    setLoading(false);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilter = () => {
    setFilters({ global: '' });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDownloadClose = (format) => {
    setAnchorEl(null);
    if (format === 'CSV') {
      exportCSV();
    } else if (format === 'Excel') {
      exportExcel();
    } else if (format === 'PDF') {
      exportPDF();
    } else if (format === 'Word') {
      // Handle Word export here
    } else if (format === 'HTML') {
      // Handle HTML export here
    } else if (format === 'JSON') {
      exportJSON();
    }
  };

  const exportCSV = () => {
    const data = schools.map((school) => ({
      Rank: school.rank,
      'School Name': school.name,
      'Trees Planted': school.treesPlanted,
      Zone: school.zone,
    }));
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'data.csv');
  };

  const exportExcel = () => {
    const data = schools.map((school) => ({
      Rank: school.rank,
      'School Name': school.name,
      'Trees Planted': school.treesPlanted,
      Zone: school.zone,
    }));
     
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
      
    FileSaver.saveAs(new Blob([blob], { type: 'application/octet-stream' }), 'data.xlsx');
  };
  

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(10, 10, 'Treedata');
    doc.autoTable({ html: tableRef.current }); 
    doc.save('data.pdf');
  };

  const exportJSON = () => {
    const jsonData = JSON.stringify(schools, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    FileSaver.saveAs(blob, 'data.json');
  };


  return (
    // <Grid container spacing={2} >
      <Grid item xs={12} sm={6} md={8} >
        <Paper elevation={3} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {filters.global && (
                    <IconButton onClick={handleClearFilter}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            value={filters.global}
            onChange={(e) => handleFilterChange('global', e.target.value)}
          />
          <Button
            color="primary"
            aria-label="Filter List"
            onClick={handleDownloadClick}
            style={{ background: 'transparent' }}
          >
            <GetAppIcon />
            Export
          </Button>
        </Paper>
        {/* <Grid item xs={12} sm={6} md={8} className="responsive-container" > */}
        <TableContainer component={Paper} style={{ padding: '16px',  justifyContent: 'space-between', alignItems: 'center' }}>
          <Table ref={tableRef} id="Treedata">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>School Name</TableCell>
                <TableCell>Trees Planted</TableCell>
                <TableCell>Zone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schools
                .filter((school) => {
                  const globalFilter = filters.global.toLowerCase();
                  return (
                    globalFilter === '' ||
                    school.rank.toString().includes(globalFilter) ||
                    school.name.toLowerCase().includes(globalFilter) ||
                    school.treesPlanted.toString().includes(globalFilter) ||
                    school.zone.toLowerCase().includes(globalFilter)
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>{school.rank}</TableCell>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{school.treesPlanted}</TableCell>
                    <TableCell>{school.zone}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={schools.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      {/* </Grid> */}
      <Grid item xs={12} sm={6} md={4}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleDownloadClose}>
          {['CSV', 'Excel', 'PDF', 'Word', 'HTML', 'JSON'].map((format) => (
            <MenuItem key={format} onClick={() => handleDownloadClose(format)}>
              {format}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    // </Grid>
    // </Grid>
  );
};

export default SchoolsTable;
