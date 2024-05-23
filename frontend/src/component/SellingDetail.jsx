import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import usePreviewImg from '../hooks/usePreviewImg';
import { useRecoilValue } from 'recoil';
import userAtom from '../atom/userAtom.js';


const useStyles = {
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  paper: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '15px',
  },
  avatar: {
    margin: '10px',
    backgroundColor: 'primary.main',
  },
  form: {
    width: '100%',
    marginTop: '20px',
  },
  submit: {
    marginTop: '30px',
  },
};

const PropertyDetailsForm = () => {
  const user = useRecoilValue(userAtom)
  const { imgUrl, handleImageChange } = usePreviewImg();
  const amenitiesOptions = ['Swimming Pool', 'Gym', 'Parking', 'Garden'];

  const formik = useFormik({
    initialValues: {
      sellerId: user._id,
      title: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      amenities: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      'address.street': Yup.string().required('Street is required'),
      'address.city': Yup.string().required('City is required'),
      'address.state': Yup.string().required('State is required'),
      'address.postalCode': Yup.string().required('Postal Code is required'),
      'address.country': Yup.string().required('Country is required'),
      price: Yup.number().required('Price is required'),
      bedrooms: Yup.number().required('Number of bedrooms is required'),
      bathrooms: Yup.number().required('Number of bathrooms is required'),
      area: Yup.number().required('Area is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/property/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values, images: [imgUrl], address: {

            }
          })
        });

        const data = await response.json();

        if (data.error) {
          throw new Error('Added failed');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  });

  return (
    <Box style={useStyles.container}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={6} style={useStyles.paper}>
          <Avatar style={useStyles.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Property Details
          </Typography>
          <form onSubmit={formik.handleSubmit} style={useStyles.form}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="street"
              name="street"
              label="Street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
              error={formik.values.address.street && Boolean(formik.errors.address.street)}
              helperText={formik.values.address.street && formik.errors.address.street}
            />
          <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="address.street"
              name="address.street"
              label="Street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
              error={formik.touched['address.street'] && Boolean(formik.errors['address.street'])}
              helperText={formik.touched['address.street'] && formik.errors['address.street']}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="address.state"
              name="address.state"
              label="State"
              value={formik.values.address.state}
              onChange={formik.handleChange}
              error={formik.touched['address.state'] && Boolean(formik.errors['address.state'])}
              helperText={formik.touched['address.state'] && formik.errors['address.state']}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="address.postalCode"
              name="address.postalCode"
              label="PostalCode"
              value={formik.values.address.postalCode}
              onChange={formik.handleChange}
              error={formik.touched['address.postalCode'] && Boolean(formik.errors['address.postalCode'])}
              helperText={formik.touched['address.postalCode'] && formik.errors['address.postalCode']}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="address.country"
              name="address.country"
              label="Country"
              value={formik.values.address.country}
              onChange={formik.handleChange}
              error={formik.touched['address.country'] && Boolean(formik.errors['address.country'])}
              helperText={formik.touched['address.country'] && formik.errors['address.country']}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="bedrooms"
              name="bedrooms"
              label="Number of Bedrooms"
              type="number"
              value={formik.values.bedrooms}
              onChange={formik.handleChange}
              error={formik.touched.bedrooms && Boolean(formik.errors.bedrooms)}
              helperText={formik.touched.bedrooms && formik.errors.bedrooms}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="bathrooms"
              name="bathrooms"
              label="Number of Bathrooms"
              type="number"
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              error={formik.touched.bathrooms && Boolean(formik.errors.bathrooms)}
              helperText={formik.touched.bathrooms && formik.errors.bathrooms}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="area"
              name="area"
              label="Area (sq ft)"
              type="number"
              value={formik.values.area}
              onChange={formik.handleChange}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
            />
            <FormGroup>
              {amenitiesOptions.map((amenity) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={amenity}
                      onChange={formik.handleChange}
                      name="amenities"
                      checked={formik.values.amenities.includes(amenity)}
                    />
                  }
                  label={amenity}
                  key={amenity}
                />
              ))}
            </FormGroup>
            <Button
              variant="contained"
              component="label"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                onChange={handleImageChange}
              />
            </Button>
            {imgUrl && (
              <Box style={{ marginTop: '20px' }}>
                <Avatar
                  src={imgUrl}
                  style={{ margin: '5px', width: '60px', height: '60px' }}
                />
              </Box>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={useStyles.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default PropertyDetailsForm;