import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";

const Brokers = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Brokers</h1>
        <SearchBar />
      </Container>
    </>
  );
};

export default Brokers;
