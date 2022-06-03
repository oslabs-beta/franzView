import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/Chart";
import MetricsCard from "../components/MetricsCard";
import Broker from "../components/Broker";
import ConsumerCard from "../components/ConsumerCard";

import {
  ALL_BROKER_CPU_USAGE,
  CARD_METRICS_QUERY,
  ALL_BROKER_DISK_USAGE,
} from "../models/queries";
import { useQuery } from "@apollo/client";

function DashboardContent() {
  const { loading, data } = useQuery(CARD_METRICS_QUERY, {
    pollInterval: 60000,
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={16}
              >
                <Chart
                  query={ALL_BROKER_CPU_USAGE}
                  metric="cpuUsage"
                  step="30s"
                  duration={5}
                  pollInterval={60}
                  title="CPU Usage"
                  yAxisLabel="% CPU Used"
                />
              </Paper>
            </Grid>
            {/* Chart 2 */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={16}
              >
                <Chart
                  query={ALL_BROKER_DISK_USAGE}
                  metric="diskUsage"
                  step="30s"
                  duration={5}
                  pollInterval={60}
                  title="Disk Usage"
                  yAxisLabel="% Memory Used"
                />
              </Paper>
            </Grid>
            {/* Metrics Card */}
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
                    loading
                      ? "Loading..."
                      : data.cluster.numberUnderReplicatedPartitions
                          .underReplicatedPartitions
                  }
                  title="Underreplicated partitions"
                  toBe="Should be zero."
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
                  value={
                    loading
                      ? "Loading..."
                      : data.cluster.activeControllerCount.count
                  }
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
                  value={
                    loading
                      ? "Loading..."
                      : data.cluster.offlinePartitionCount.count
                  }
                  title="Offline partitions count"
                  toBe="Should be zero."
                />
              </Paper>
            </Grid>
            {/* Broker Component */}
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
                elevation={4}
              >
                <Broker />
              </Paper>
            </Grid>
          </Grid>
          {/* Consumer/Consumer Groups Components */}
          <Grid item xs={2}>
            <ConsumerCard />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
