import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import { StyledCardActions, StyledCardBook } from "../Styled/Card";
import { StyledTypographyCard, StyledTypographySpan } from "../Styled/Typography";
import CircularIndeterminate from "./Loading";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../redux/actions/productsAction";

export default function CardHome() {

  // setting  state
 
  const [sliceProducts, setSliceProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const data = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //Fetch data from redux
  useEffect(() => {
    dispatch(productsAction());
  }, [dispatch]);

  useEffect(() => {
    if (data !== null) {
   
      setLoading(false);
      setSliceProducts(data?.splice(0, 3));
    }
  }, [data]);

 

  //nagivate
  const nagivate = useNavigate();
  const handleDetails = (id) => {
    console.log(id);
    nagivate(`/Details/${id}`);
  };

  return (
    <Container  sx={{minHeight:'195px'}}>

      {!loading ? (
        <>
          <Typography
            sx={{
              paddingLeft: "30px",
              fontSize: "2rem",
              fontWeight: "600",
              margin: "20px",
            }}
          >
          
            <StyledTypographySpan variant="span" component="span">
              Products
            </StyledTypographySpan>{" "}
        
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {sliceProducts.map((product, index) => (
              <StyledCardBook
                key={index}
                onClick={() => handleDetails(product.id)}
              >
                <CardHeader
                  sx={{ position: "absolute", right: "0", margin: "20px" }}
                />

                <Box component="div">
                  <CardMedia
                    sx={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
                    component="img"
                    image={product.image_url}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Grid
                      container
                      item
                      xs={12}
                      sx={{ alignItems: "center", marginBottom: "15px" }}
                    >
                      <Grid item xs={9}>
                        <StyledTypographyCard
                          variant="body2"
                          sx={{ fontSize: "1rem", height: "35px" }}
                        >
                          {product.name}
                        </StyledTypographyCard>
                      </Grid>
                    </Grid>

                 
                  </CardContent>
                  <StyledCardActions disableSpacing>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {product.sale_price} $
                    </Typography>

                    <IconButton aria-label="share">
                      <Rating
                        name="simple-controlled"
                        value={Number(product.average_product_rating)}
                      />
                    </IconButton>
                  </StyledCardActions>
                </Box>
              </StyledCardBook>
            ))}
          </Box>

        </>
      ) : (
        <>
          <CircularIndeterminate />
        </>
      )}
    </Container>
  );
}
