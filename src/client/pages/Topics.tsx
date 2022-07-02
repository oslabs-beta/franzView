import React, { useState } from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";
import { CORE_ALL_BROKERS_QUERY } from "../models/queries";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MetricsCard from "../components/MetricsCard";
import { useQuery } from "@apollo/client";
import RealTimeLineChart from "../components/RealTimeLineChart";
import TopicDataGrid from "../components/TopicDataGrid";
import {
  BYTES_IN_PER_SECOND,
  BYTES_OUT_PER_SECOND,
  // AVERAGE_TOTALTIMEMS,
  DASHBOARD_CARD_METRICS_QUERY,
  BROKER_PAGE_QUERY,
  TOPIC_DATAGRID_QUERY,
} from "../models/queries";

const Topics = () => {
  const [filter, setFilter] = useState([]);

  // Metric cards -
  const counts = useQuery(DASHBOARD_CARD_METRICS_QUERY, {
    variables: {
      request: "FetchUnderRep",
      brokerIds: filter.length > 0 ? filter : null,
    },
    pollInterval: 20000,
  });

  const test = useQuery(BROKER_PAGE_QUERY, {
    variables: {
      request: "FetchUnderRep",
      brokerIds: filter.length > 0 ? filter : null,
    },
    pollInterval: 20000,
  });

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3}>
          {/*Bytes in per second chart*/}
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

          {/* Cards */}
          {/* Metrics Card 4 - Underreplicated Partitions  */}
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
                  counts.loading
                    ? "Loading..."
                    : counts.data.cluster.numberUnderReplicatedPartitions
                        .underReplicatedPartitions
                }
                title="Underreplicated partitions"
                toBe="Should be zero."
              />
            </Paper>
          </Grid>

          {/* Metrics Card 5 - Under Min ISR  */}
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
                  test.loading
                    ? "Loading..."
                    : test.data.cluster.underMinIsr.metric
                }
                title="Under Min ISR"
                toBe="Should be zero."
              />
            </Paper>
          </Grid>

          {/* Datagrid */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              elevation={4}
            >
              <TopicDataGrid />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>

    // charts
    // Bytes in
    // Average
    // per topic when clicked
    // bytes out
    // Average
    // per topic when clicked

    // card
    // under replicated partitions
    // Total undermin ISR
    // total log

    // data grid of topics
    // replace ISR per partition with undermin ISR
  );
};

export default Topics;
