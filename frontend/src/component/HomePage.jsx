import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Container, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CardMedia, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from "../data/background.jpg"; // Replace with your image path
import { useNavigate } from 'react-router-dom';
import NavBar from './commons/navBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // Your existing styles here...
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', // Ensure position is relative for absolute positioning of bedroom count
    backgroundColor:'#F7F6F6'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    position: 'relative', // Ensure position is relative for absolute positioning of bedroom count
  },
  bedroomsCount: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  cardActions: {
    marginTop: 'auto', // Push actions to the bottom of the card
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const HomePage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [properties, setProperties] = useState([]);

  // Fetch properties on component mount
  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch("/api/property");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      {/* Your existing code for background and search form */}
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {properties.map((property) => (
            <Grid item key={property._id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={property.images[0] || 'default-image.jpg'} // Fallback image if no images are available
                  title={property.title}
                >
                  <Typography variant="body2" className={classes.bedroomsCount}>
                    {property.numberOfBedrooms} Beds
                  </Typography>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {property.title}
                  </Typography>
                  <Typography>
                    {property.description}
                  </Typography>
                  <Typography>
                    {property.address.city}, {property.address.state}
                  </Typography>
                  <Typography>
                    ${property.price}
                  </Typography>
                  <Typography>
                    {property.numberOfBedrooms} Beds, {property.numberOfBathrooms} Baths
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary" className={classes.button}>
                    View
                  </Button>
                  <Button size="small" color="primary" className={classes.button}>
                    Contact
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
