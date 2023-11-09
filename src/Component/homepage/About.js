import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';

function About() {

  const sectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '65px', // height of the navbar
  };

  const headerStyles = {
    marginBottom: '20px',
  };

  const centeredTextStyles = {
    textAlign: 'center',
    // marginTop: '20px',
  };

  const mobileStyles = {
    width: '100%',
    height: '50vh',
  };

  const imageStyles = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: 'none',
    padding: '0',
    margin: '0',
  };

  const listStyles = {
    textAlign: 'left',
    marginLeft: '40px',
  };

  const images = [
    'https://img.freepik.com/free-photo/side-view-hands-gardening_23-2149894697.jpg?w=740&t=st=1696505483~exp=1696506083~hmac=6ade7c2d169306e1352a157bd4c3e3e0b07decdfbdef0661a6ece680c90f89e1',
    'https://img.freepik.com/premium-photo/people-planting-trees-working-community-garden-promoting-local-food-production-habitat-restoration-concept-sustainability-community-engagement-generate-ai_740533-923.jpg?w=740',
  ];

  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Check for small screens

  return (
    <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
      <Grid container spacing={3} >

        {/* Left Section */}
        <Grid item xs={12} sm={6} style={sectionStyles}>
          <div style={isSmallScreen ? centeredTextStyles : null}>
            {/* Center-align text on small screens */}
            <Typography variant="h4" gutterBottom>
              About ElimuTree
            </Typography>
            <Typography variant="h1" gutterBottom style={headerStyles}>
              What is ElimuTrees?
            </Typography>
            <Typography variant="body1" paragraph>
              Elimu Trees, a visionary initiative supported by the Ministry of Education,
              is dedicated to nurturing a greener and more sustainable future.
              This inspiring project brings together students, educators, parents,
              and all who share a passion for environmental conservation.
              At its heart, Elimu Trees is a platform that encourages active participation
              in tree planting and the continuous monitoring of tree growth, all while meticulously
              documenting the invaluable progress.
            </Typography>
            <Typography variant="body1" paragraph>
              ElimuTrees is your all-in-one solution for growing trees and monitoring
              tree planting exercises in learning institutions and Education Agencies. We
              empower Institutions to make a positive impact on the environment
              while providing a platform for learners, staff, and volunteers
              to participate in this vital mission.
            </Typography>
            <Typography variant="body1" paragraph>
              The primary aim of Elimu Trees is to cultivate a profound appreciation for the environment
              by engaging individuals of all ages in the deeply rewarding act of planting trees.
              The project instills the importance of sustainable practices and fosters a collective sense of responsibility
              for our planet's well-being. By recording the growth and performance of trees,
              Elimu Trees creates a rich database of vital information. This data not only
              enhances our understanding of which tree species thrive in specific environments but also
              aids in the strategic allocation of trees to different zones for optimal growth.
              The result is a greener, more harmonious world.
            </Typography>
            <Button
              variant="contained"
              sx={{ fontWeight: 'bold', backgroundColor: '#603813' }}
              color="warning"
              size="large"
            >
              LEARN MORE
            </Button>
          </div>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} sm={6} style={sectionStyles}>
          {isSmallScreen ? (
            // for small screens images will display as a slide show 
            <Paper elevation={0}>
              <Carousel
                showThumbs={false}
                showArrows={true}
                infiniteLoop={true}
                autoPlay interval={1500} emulateTouch
              >
                {images.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      src={imageUrl}
                      alt={`Carousel img ${index + 1}`}
                      style={{ ...imageStyles, ...mobileStyles }}
                    />
                  </div>
                ))}
              </Carousel>
            </Paper>
          ) : (
            // Render a single image for larger screens
            <div style={{ marginTop: '2rem' }}>
              <Paper elevation={0}>
                <img
                  src='https://img.freepik.com/free-photo/side-view-hands-gardening_23-2149894697.jpg?w=740&t=st=1696505483~exp=1696506083~hmac=6ade7c2d169306e1352a157bd4c3e3e0b07decdfbdef0661a6ece680c90f89e1'
                  alt="About Us"
                  style={imageStyles}
                />
              </Paper>
            </div>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid item xs={12} sm={6} style={sectionStyles}>
          {isSmallScreen ? null : (
            // Render a single image for larger screens
            <Paper elevation={0}>
              <img
                src="https://img.freepik.com/premium-photo/people-planting-trees-working-community-garden-promoting-local-food-production-habitat-restoration-concept-sustainability-community-engagement-generate-ai_740533-923.jpg?w=740"
                alt="About Us"
                style={{ ...imageStyles }}
              />
            </Paper>
          )}
        </Grid>
        {/* Right Section */}
        <Grid item xs={12} sm={6} style={sectionStyles}>
          <div style={isSmallScreen ? { ...centeredTextStyles, } : null}>
            {/* Center-align text on small screens and apply mobileStyles */}
            <Typography variant="h4" gutterBottom>
              Key Features
            </Typography>
            <Typography variant="h2" gutterBottom>
              Why Choose ElimuTrees?
            </Typography>
            <Typography variant="body1" paragraph style={listStyles}>
              <li>Realtime GPS Tracking</li>
              <li>Easy Session Creation</li>
              <li>Interactive Mapping</li>
              <li>Progress Reports</li>
              <li>Educational Resources</li>
            </Typography>
            <Typography variant="body1" paragraph>
              Trees, the silent heroes of our ecosystem, play a pivotal role in sustaining life on Earth.
              They contribute to cleaner air by absorbing carbon dioxide and releasing oxygen,
              thus mitigating climate change. Beyond that, trees offer a haven for wildlife and
              a source of sustenance for countless organisms. In an educational context,
              they provide not only a hands-on lesson in biology and environmental science
              but also a platform for inspiring curiosity, teamwork, and responsibility among students.
              Moreover, trees serve as the source of raw materials for the production of books,
              an essential tool in the learning journey. By fostering the growth of trees within school environments,
              Elimu Trees not only beautifies the campuses but also bolsters the academic resources for the next generation.
            </Typography>
            <Button
              variant="contained"
              sx={{ fontWeight: 'bold', backgroundColor: '#603813' }}
              color="warning"
              size="large"
            >
              EXPLORE FEATURES
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
