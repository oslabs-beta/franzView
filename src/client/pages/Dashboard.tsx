import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import Chart from "../components/Chart";
import MetricsCard from "../components/MetricsCard";
import Broker from "../components/Broker";
import ConsumerCard from "../components/ConsumerCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  ALL_BROKER_CPU_USAGE,
  CARD_METRICS_QUERY,
  ALL_BROKER_DISK_USAGE,
} from "../models/queries";
import { useQuery } from "@apollo/client";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        OSLabs Beta
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mdTheme = createTheme();

function DashboardContent() {
  const { loading, error, data } = useQuery(CARD_METRICS_QUERY, {
    pollInterval: 60000,
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
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
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart
                    query={ALL_BROKER_CPU_USAGE}
                    metric="cpuUsage"
                    step="15s"
                    duration={5}
                    pollInterval={30}
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
                    height: 240,
                  }}
                >
                  <Chart
                    query={ALL_BROKER_DISK_USAGE}
                    metric="diskUsage"
                    step="15s"
                    duration={5}
                    pollInterval={30}
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
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Broker />
                </Paper>
              </Grid>
            </Grid>
            {/* Consumer/Consumer Groups Components */}
            <Grid item xs={2}>
              <ConsumerCard />
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
