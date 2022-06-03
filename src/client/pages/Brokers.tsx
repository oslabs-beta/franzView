import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";
import { CORE_ALL_BROKERS_QUERY } from "../models/queries";

const Brokers = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Brokers</h1>
        <SearchBar searchingFor="brokers" query={CORE_ALL_BROKERS_QUERY} />
      </Container>
    </>
  );
};

export default Brokers;
