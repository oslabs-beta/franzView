import React, { useState } from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";
import { CORE_ALL_BROKERS_QUERY } from "../models/queries";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MetricsCard from "../components/MetricsCard";
import { useQuery } from "@apollo/client";
import RealTimeLineChart from "../components/RealTimeLineChart";
import {
  BYTES_IN_PER_SECOND,
  BYTES_OUT_PER_SECOND,
  AVERAGE_TOTALTIMEMS,
  DASHBOARD_CARD_METRICS_QUERY,
  BROKER_PAGE_QUERY,
} from "../models/queries";

//Move real-line charts to top of page
const Brokers = () => {
  const [filter, setFilter] = useState([]);

  const produce = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "Produce",
      brokerIds: filter.length > 0 ? filter : null,
    },
    pollInterval: 20000,
  });

  const consumer = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "FetchConsumer",
      brokerIds: filter.length > 0 ? filter : null,
    },
    pollInterval: 20000,
  });

  const follower = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "FetchFollower",
      brokerIds: filter.length > 0 ? filter : null,
    },
    pollInterval: 20000,
  });

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Brokers</h1>
        <SearchBar
          setFilter={setFilter}
          searchingFor="brokers"
          query={CORE_ALL_BROKERS_QUERY}
        />

        <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
          {/* Bytes in per second chart */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
              elevation={16}
            >
              <RealTimeLineChart
                query={BYTES_IN_PER_SECOND}
                metric="bytesInPerSecond"
                step="30s"
                duration={5}
                pollInterval={60}
                title="Bytes In Per Second"
                yAxisLabel="BytesPerSecond"
                resource="topic"
                label="topic"
                args={{ brokerIds: filter.length > 0 ? filter : null }}
              />
            </Paper>
          </Grid>

          {/* BYTES OUT PER SEC LINE CHART */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
              elevation={16}
            >
              <RealTimeLineChart
                query={BYTES_OUT_PER_SECOND}
                metric="bytesOutPerSecond"
                step="30s"
                duration={5}
                pollInterval={60}
                title="Bytes Out Per Second"
                yAxisLabel="BytesPerSecond"
                resource="topic"
                label="topic"
                args={{ brokerIds: filter.length > 0 ? filter : null }}
              />
            </Paper>
          </Grid>

          {/* Metric card 1 - Reduce request */}
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
                value={
                  produce.loading
                    ? "Loading..."
                    : produce.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Produce Request (TotalTimeMs)"
                description="milliseconds"
              />
            </Paper>
          </Grid>

          {/* Metrics Card 2 - Consumer Request*/}
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
                value={
                  consumer.loading
                    ? "Loading..."
                    : consumer.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Consumer Request (TotalTimeMs)"
                description="milliseconds"
              />
            </Paper>
          </Grid>

          {/* Metrics Card 3 - Follower Request */}
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
                value={
                  follower.loading
                    ? "Loading..."
                    : follower.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Follower Request (TotalTimeMs)"
                description="milliseconds"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Brokers;
