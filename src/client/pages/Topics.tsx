import React, { useState } from "react";
import Container from "@mui/material/Container";
// import SearchBar from "../components/Searchbar";
// import { CORE_ALL_BROKERS_QUERY } from "../models/queries";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MetricsCard from "../components/MetricsCard";
import { useQuery } from "@apollo/client";
import RealTimeLineChart from "../components/RealTimeLineChart";
import TopicGrid from "../components/TopicGrid";
import {
  BYTES_IN_PER_SECOND,
  BYTES_OUT_PER_SECOND,
  // AVERAGE_TOTALTIMEMS,
  DASHBOARD_CARD_METRICS_QUERY,
  TOPIC_PAGE_QUERY,
  MESSAGES_IN_PER_SEC,
  // TOTAL_LOG_SIZE,
  // TOPIC_DATAGRID_QUERY,
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

  const topicCardQuery = useQuery(TOPIC_PAGE_QUERY, {
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

          {/* MESSAGES IN PER SEC LINE CHART */}
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
                query={MESSAGES_IN_PER_SEC}
                metric="messagesInPerSecond"
                step="30s"
                duration={5}
                pollInterval={60}
                title="Message In Per Second"
                yAxisLabel="MessagesInPerSecond"
                resource="topic"
                label="topic"
                args={{ brokerIds: filter.length > 0 ? filter : null }}
              />
            </Paper>
          </Grid>

          {/* Cards */}

          <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            {/* UNDERREPLICATED PARTITIONS CARD */}
            <Grid container spacing={3}>
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
                    description="Should be zero."
                  />
                </Paper>
              </Grid>

              {/* UNDER MIN ISR CARD  */}
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
                    query={TOPIC_PAGE_QUERY}
                    searchingFor="metric"
                    title="Total Under Min ISR"
                    description="Should be zero."
                  />
                </Paper>
              </Grid>

              {/* TOTAL LOG SIZE  */}
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
                      topicCardQuery.loading
                        ? "Loading..."
                        : topicCardQuery.data.topics
                            .reduce((acc, val) => {
                              return (acc += val.logSize);
                            }, 0)
                            .toFixed(2)
                    }
                    title="Total Log Size"
                    description="Shown in GB."
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/* Datagrid */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
              elevation={4}
            >
              <TopicGrid title="Kafka Cluster" rowCount={5} />
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
