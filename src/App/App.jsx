import Navbar from "../Components/Navbar";
import { theme } from "../theme/index";
import { ThemeProvider } from "@mui/system";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Details from "../Pages/Details";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import Favorite from "../Pages/Favorite";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";
import  store  from '../redux/store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
     <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column",flex:"1 0 auto"}}>

        <Navbar />
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="Favorite" element={<Favorite />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

      </Box>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
