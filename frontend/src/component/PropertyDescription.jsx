import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userAtom from "../atom/userAtom.js";
import { useRecoilState } from "recoil";

const PropertyDescription = () => {
  const [property, setProperty] = useState(null);
  const [seller, setSeller] = useState(null);
  const { pid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const res = await fetch(`/api/property/${pid}`);
        const data = await res.json();
        if (data.error) return toast.error(data.error);
        setProperty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProperty();
  }, [pid]);

  const handleWishList = async () => {
    try {
      const res = await fetch(`/api/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: property._id,
        }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      let newUser = { ...user, wishlist: data.wishlist };
      toast.success(data.message);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInterested = async () => {
    try {
      const res = await fetch(`/api/user/${property.sellerId}`);
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      setSeller(data);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = () => {
    // Implement your logic here
    toast.info("You liked this property!");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <Container>
      {property && (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {property.title}
            </Typography>
          </Box>
          <Divider />
          <Card sx={{ mt: 4 }}>
            <CardMedia
              component="img"
              height="400"
              image={property.image}
              alt={property.title}
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {property.description}
              </Typography>
              <Divider />
              <Typography variant="h6" mt={2} mb={1}>
                Price: ₹{property.price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Address:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {property.address.street}, {property.address.city},{" "}
                {property.address.state}, {property.address.postalCode},{" "}
                {property.address.country}
              </Typography>
              <Box mt={2} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInterested}
                  sx={{ ml: "auto" }}
                >
                  I'm interested
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      )}

      {seller && (
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Seller Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Name: {seller.firstName+" "+seller.lastName}
            </DialogContentText>
            <DialogContentText>
              Email: {seller.email}
            </DialogContentText>
            <DialogContentText>
              Phone: {seller.phoneNumber}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default PropertyDescription;
