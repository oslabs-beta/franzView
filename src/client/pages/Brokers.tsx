import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";
import { CORE_ALL_BROKERS_QUERY } from "../models/queries";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MetricsCard from "../components/MetricsCard";

const Brokers = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Brokers</h1>
        <SearchBar searchingFor="brokers" query={CORE_ALL_BROKERS_QUERY} />
        <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
              elevation={8}
            >
              <MetricsCard
                value={6}
                title="Underreplicated partitions"
                toBe="milliseconds"
              />
            </Paper>
          </Grid>
          {/* Metrics Card 2 */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
              elevation={8}
            >
              <MetricsCard
                value={72}
                title="Active controller count"
                toBe="Should be one."
              />
            </Paper>
          </Grid>
          {/* Metrics Card 3 */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
              elevation={8}
            >
              <MetricsCard
                value={8}
                title="Offline partitions count"
                toBe="Should be zero."
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Brokers;
