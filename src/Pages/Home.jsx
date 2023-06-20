
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import CardHome from "../Components/CardHome";
import PagesCover from "../Components/PageCover";
import {  StyledButtonNotFound } from "../Styled/Button";

const Home = () => {
  const nagivate = useNavigate();
  const handleGoToBooks = () => {
    nagivate("/Products");
  };
  return (
    <>
      <PagesCover Word="Home" />
      <CardHome />
      <Stack alignItems="center">
        <StyledButtonNotFound onClick={handleGoToBooks}>More Products</StyledButtonNotFound>
      </Stack>
    </>
  );
};

export default Home;
