import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

// importing mui used components
import {
  Box,
  Rating,
  Stack,
  Typography,
  CardActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router";

//Use Carousal MUI
import { StyledButtonDetails } from "../Styled/Button";
import CircularIndeterminate from "./Loading";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { productsDetailsAction } from "../redux/actions/productDetails";
const DetailsComponent = () => {
  // use useState for loading the product details
  const [loading, setLoading] = useState(false);

  // use useParams to get id from react-router
  const { id } = useParams();

  // use theme
  const theme = useTheme();

  //use medai query from MUI
  const matches = useMediaQuery(theme.breakpoints.up("976"));

 //get details from Redux
  const { productDetail } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Fetch data from Api with redux
  useEffect(() => {
    dispatch(productsDetailsAction(id));
  }, [id,dispatch]);

  useEffect(() => {
    if (productDetail !== null) {
      setLoading(true);
    }
  }, [productDetail]);

  // Function to add to array of favorites
  const arr = JSON.parse(localStorage.getItem("Favourite")) || [];

  const handleAddToFav = () => {
    const index = arr.findIndex((object) => object.id === productDetail.id);

    toastSuccess(`Add ${productDetail.name} to Favorite `);
    // To not Duplicted
    if (index === -1) {
      arr.push(productDetail);
      localStorage.setItem("Favourite", JSON.stringify(arr));
    }
  };

  return (
    <Container sx={{ minHeight: "195px" }}>
      <ToastContainer />
      {loading ? (
        <>
          {matches ? (
            <>
              <Box
                component="img"
                src={`${productDetail.image_url}`}
                width="auto"
                height="420px"
                sx={{ borderRadius: "20px", marginLeft: "120px" }}
              />
              <Typography
                component="h1"
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.9rem",
                  marginTop: "20px",
                }}
              >
                {productDetail.name}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  {productDetail.brand}
                </Typography>
              </Stack>

              <CardActions disableSpacing>
                <IconButton aria-label="share">
                  <Rating
                    name="simple-controlled"
                    value={Number(productDetail.average_product_rating)}
                  />
                </IconButton>
              </CardActions>

              <Box
                sx={{
                  fontWeight: "light",
                  fontSize: "18px",
                  lineHeight: "1.5rem",
                }}
              >
                {productDetail.description}
              </Box>
              <Box textAlign="center">
                <StyledButtonDetails
                  variant="contained"
                  onClick={handleAddToFav}
                >
                  Add to Favorite
                </StyledButtonDetails>
              </Box>
            </>
          ) : (
            <Container sx={{ maxWidth: "80%", margin: "auto" }}>
              <Box
                component="img"
                src={`${productDetail.image_url}`}
                width="auto"
                height="420px"
                sx={{ borderRadius: "20px" }}
              />
              <Typography
                component="h1"
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.9rem",
                  marginTop: "20px",
                }}
              >
                {productDetail.name}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  {productDetail.brand}
                </Typography>
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <Rating
                      name="simple-controlled"
                      value={Number(productDetail.average_product_rating)}
                    />
                  </IconButton>
                </CardActions>
              </Stack>

              <Typography
                variant="body2"
                component="h1"
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "600",
                  margin: "20px 0px 20px 0px",
                }}
              >
                {productDetail.title}
              </Typography>
              <Box sx={{ fontWeight: "light", fontSize: "18px" }}>
                {productDetail.description}
              </Box>
              <Box textAlign="center">
                <StyledButtonDetails
                  variant="contained"
                  onClick={handleAddToFav}
                >
                  Add to Favorite
                </StyledButtonDetails>
              </Box>
            </Container>
          )}
        </>
      ) : (
        <>
          <CircularIndeterminate />
        </>
      )}
    </Container>
  );
};

export default DetailsComponent;
