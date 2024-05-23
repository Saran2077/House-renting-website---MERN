
import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from "../../data/background.jpg"; // Replace with your image path
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
const NavBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Rentify
                </Typography>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" onClick={() => navigate("/wishlist")}>WishList</Button>
                <Button color="inherit" onClick={() => navigate("/SellingDetail")}>Sell</Button>
                <Button color="inherit" onClick={() => navigate("/Login")}>Sign In</Button>
            </Toolbar>
        </AppBar>

    )
}

export default NavBar;
