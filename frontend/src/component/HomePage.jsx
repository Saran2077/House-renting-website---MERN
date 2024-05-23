import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Container, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from "../data/background.jpg"; // Replace with your image path
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(to right, #C73659, #C73659)', // Blue gradient example
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0)',
    width: '100%',
    padding: theme.spacing(4),
    textAlign: 'center',
    color: 'white',
  },
  searchContainer: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust transparency as needed
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '100%',
    margin: 'auto',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
    backgroundColor: "#C73659",
    color: "#fff",
    height: '100%',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState([]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAmenitiesChange = (event) => {
    setAmenities(event.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching with:', { location, bedrooms, bathrooms, price, amenities });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rentify
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">WishList</Button>
          <Button color="inherit" onClick={() => navigate("/SellingDetail")}>Sell</Button>
          <Button color="inherit" onClick={() => navigate("/Login")}>Sign In</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.background}>
        <div className={classes.overlay}>
          <Typography variant="h3" gutterBottom>
            Find your next dream home
          </Typography>
          <Typography variant="h6" gutterBottom>
            Real estate for sale
          </Typography>
          <Container className={classes.searchContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <Select
                    value={location}
                    onChange={handleLocationChange}
                    label="Location"
                    inputProps={{
                      name: 'location',
                      id: 'location',
                    }}
                  >
                    <MenuItem value="">Select Location</MenuItem>
                    <MenuItem value="Bangalore">Bangalore</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="Delhi">TamilNadu</MenuItem>
                    <MenuItem value="Delhi">Kerala</MenuItem>
                    <MenuItem value="Delhi">Assam</MenuItem>
                    <MenuItem value="Delhi">Goa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="bedrooms">Bedrooms</InputLabel>
                  <Select
                    value={bedrooms}
                    onChange={handleBedroomsChange}
                    label="Bedrooms"
                    inputProps={{
                      name: 'bedrooms',
                      id: 'bedrooms',
                    }}
                  >
                    <MenuItem value="">Select Bedrooms</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="bathrooms">Bathrooms</InputLabel>
                  <Select
                    value={bathrooms}
                    onChange={handleBathroomsChange}
                    label="Bathrooms"
                    inputProps={{
                      name: 'bathrooms',
                      id: 'bathrooms',
                    }}
                  >
                    <MenuItem value="">Select Bathrooms</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  variant="outlined"
                  label="Max Price ($)"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  className={classes.formControl}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="amenities-label">Amenities</InputLabel>
                  <Select
                    labelId="amenities-label"
                    id="amenities"
                    multiple
                    value={amenities}
                    onChange={handleAmenitiesChange}
                    label="Amenities"
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="Schools">Schools</MenuItem>
                    <MenuItem value="Hospitals">Hospitals</MenuItem>
                    <MenuItem value="Shopping Malls">Shopping Malls</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color= "#C73659"
                  className={classes.button}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
