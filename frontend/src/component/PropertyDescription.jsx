import { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Divider from "@mui/material/Divider";
import CardContainer from "../components/commons/cardContainer";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PropertyDescription = () => {
  const [property, setProperty] = useState(null);
  const [relatedProperty, setRelatedProperty] = useState(null)
  const { pid } = useParams();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProperty = async () => {
      try {
        const res = await fetch(`/api/property/${pid}`);
        const data = await res.json();
        if (data.error) return toast.error(data.error);
        setProperty(data);
        const res2 = await fetch(`/api/category/${data?.category ?? ""}`)
        const data2 = await res2.json()
        if (data2.error) return toast.error(data2.error);
        setRelatedProperty(data2)
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };
    getProperty();
  }, [pid]);

  const handleWishList = async () => {
    try {
      const res = await fetch(`/api/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: property._id
        })
      });
      const data = await res.json()
      if (data.error) return toast.error(data.error)
      let newUser = {...user, wishlist: data.wishlist}
      toast.success(data.message)
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      toast.error(error)
    }
  }
  
  if (isLoading) {
    return (
      <Box sx={{display: "grid", placeContent: "center", minHeight: "100%"}}>
        <CircularProgress disableShrink />
      </Box>
    )
  }

  return (
    <>
      {property && (
        <Container>
          <Grid
            container
            spacing={6}
            style={{ marginBottom: "2rem", marginTop: "1rem" }}
          >
            <Grid alignContent={"center"} item xs={12} md={6} height={"70vh"} style={{ position: 'relative' }}>
              <img
                src={property.image}
                alt="Product"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />{user &&
                user.wishlist.includes(property._id) ?
                <FavoriteIcon style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'white',borderRadius: '50%', color: "red", padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} onClick={handleWishList} />
                :
                <FavoriteBorderIcon style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'white', borderRadius: '50%', padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} onClick={handleWishList} /> 
              }
              
            </Grid>
            <Grid item xs={12} md={6} p={1} spacing={2}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                {property.title}
              </Typography>

              <Typography variant="h5" gutterBottom>
              Property Description
              </Typography>
              <Typography variant="body1" mb={2}>
                {property.description}
              </Typography>
              <Divider aria-hidden="true" />
              <Typography variant="h6" mt={1.5} mb={1.5}>
              Price:<b>₹{property.price}</b>  
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={addToCart}
              >
                I'm interested
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{fontWeight: 700}} gutterBottom>
          You might be interested in
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              {relatedProperty &&  <CardContainer cards={relatedProperty} isShowTitle={false}/>
              }
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PropertyDescription;
