import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState,useEffect} from "react";
import { StyledGridFavorite } from "../Styled/Grid";
import emptyFavorite from "../assets/empty-cart.svg";
import { StyledButtonNotFound } from "../Styled/Button";
import { useNavigate } from "react-router";

//Importing from utils 
import { toastError } from "../utils/Toast";
import { ToastContainer } from "react-toastify";

function FavoriteComponent() {
  
  const [favorite, setFavorite] = useState([]);
  const nagivate = useNavigate();

  // Take favorite list from localStorage
  useEffect(() => {
    setFavorite(JSON.parse(localStorage.getItem("Favourite")) || []);
  }, []);

  //Function to delete item from Favorite list
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to Delete Item ?")) {
      const filterFavorite = setFavorite(favorite.filter((u) => u.id !== id));
      localStorage.setItem("Favourite", JSON.stringify(filterFavorite));
      toastError(`Delete product from Favorites`);
      if (localStorage.getItem("Favourite") === "undefined") {
        localStorage.setItem("Favourite", JSON.stringify([]));
      }
    }
  };

  //Handle button go to home again 
  const handleGoToHome = () => {
    nagivate("/Home");
  };


  const handleDetails =(id)=>
  {
    nagivate(`/Details/${id}`);

  }
  return (
    <Container  sx={{minHeight:'195px'}}>
      <ToastContainer />
      {favorite?.length ? (
        favorite.map((item, index) => {
          return (
            <StyledGridFavorite item container xs={12} key={index}  >
              <Grid item xs={2.4}>
                <Box
                  component="img"
                  src={`${item.image_url}`}
                  sx={{ width: "50%", margim: "10px" }}
                  onClick={() => handleDetails(item.id)}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: "bolder" }}>
                  {item.name}
                </Typography>
                <Typography >
                  {item.brand}
                </Typography>
               
              </Grid>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </Button>
            </StyledGridFavorite>
          );
        })
      ) : (
        <>
          <Box
            component="img"
            src={emptyFavorite}
            height="400px"
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          />
          <Stack alignItems="center" margin="20px">
            <StyledButtonNotFound onClick={handleGoToHome}>
              Go to Home
            </StyledButtonNotFound>
          </Stack>
        </>
      )}
    </Container>
  );
}

export default FavoriteComponent;
