import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Container, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import { StyledCardActions, StyledCardBook } from "../Styled/Card";
import {
  StyledTypographyCard,
  StyledTypographySpan,
  StyledTypographyCardBrand,
} from "../Styled/Typography";
import PaginationComponent from "./Pagination";
import CircularIndeterminate from "./Loading";
import { useNavigate } from "react-router";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../redux/actions/productsAction";

export default function MediaCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [productPerPage] = useState(10);

  const data = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //Fetch data from Api with redux
  useEffect(() => {
    dispatch(productsAction());
  }, [dispatch]);

  useEffect(() => {
    if (data !== null) {
      setProducts(data);
      setLoading(false);
    }
  }, [data]);

  // Pagination
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProductsList = products.slice(indexOfFirstProduct, indexOfLastProduct);


  useEffect(() => {
    setCurrentProducts(currentProductsList);
  }, [products, currentProductsList]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //nagivate

  const nagivate = useNavigate();
  const handleDetails = (id) => {
    console.log(id);
    nagivate(`/Details/${id}`);
  };

  const handleSearch = (event) => {
    search(event);
  };

  const search = (event) => {
    const searchString = event.target.value;
    const foundObjects = data.filter((obj) => obj.name.includes(searchString));

    if (foundObjects.length > 0) {
      var arr = [];
      foundObjects.forEach((obj) => arr.push(obj));
      setProducts(arr);
    }
    if (event.target.value === "") {
      console.log("empty");
      setProducts(data);
    }
  };

  const [name, setName] = useState("");

  // Sorting....
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);

    if (event.target.value === "Asc") {
      products.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      setCurrentProducts(products);

      // setCurrentProducts();
    } else {
      products.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
      );
      setCurrentProducts(products);
    }
  };

  return (
    <Container sx={{ minHeight: "195px" }}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography
          sx={{
            paddingLeft: "30px",
            fontSize: "2rem",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          All{" "}
          <StyledTypographySpan variant="span" component="span">
            Products
          </StyledTypographySpan>{" "}
         
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={handleSearch}
          />

          <FormControl sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="Asc">A-Z</MenuItem>
              <MenuItem value="Desc"> Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {!loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flex: 0,
              justifyContent: "space-around",
            }}
          >
            {currentProducts?.map((product, index) => (
              <StyledCardBook
                key={index}
                onClick={() => handleDetails(product.id)}
              >
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
                    <StyledTypographyCard variant="body2">
                      {product.name}
                    </StyledTypographyCard>
                    <StyledTypographyCardBrand variant="body2">
                      {product.brand}
                    </StyledTypographyCardBrand>
                  </CardContent>
                  <StyledCardActions disableSpacing sx={{ width: "100%" }}>
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
          <PaginationComponent
            productPerPage={productPerPage}
            totalbooks={products.length}
            paginate={paginate}
          />
        </>
      ) : (
        <>
          <CircularIndeterminate />
        </>
      )}
    </Container>
  );
}
