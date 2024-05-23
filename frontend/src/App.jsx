import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './component/signup';
import HomePage from './component/HomePage';
import SellingDetail from './component/SellingDetail'

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  card: {
    cursor: 'pointer',
  },
});

const properties = [
  { id: 1, name: '8 Tampa Heights', location: 'Miami, United States', price: '$1,000,000', bedrooms: 3, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 2, name: '5 Santa Cruz', location: 'Tenerife, Spain', price: '$700,000', bedrooms: 4, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 3, name: '10 Holborn Flats', location: 'London', price: '$1,000,000', bedrooms: 3, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 4, name: '7 West Ave', location: 'Austin, United States', price: '$500,000', bedrooms: 5, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 5, name: 'Shoreditch House', location: 'London', price: '$1,000,000', bedrooms: 3, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 6, name: '103 Avenue Apts', location: 'New York, United States', price: '$2,200,000', bedrooms: 4, imageUrl: 'https://via.placeholder.com/300', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
];

const App = () => {
  const classes = useStyles();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  const handleBackClick = () => {
    setSelectedProperty(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SellingDetail" element={<SellingDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
