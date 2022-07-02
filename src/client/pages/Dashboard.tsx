import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RealTimeLineChart from "../components/RealTimeLineChart";
import MetricsCard from "../components/MetricsCard";
import ConsumerCard from "../components/ConsumerCard";

import {
  ALL_BROKER_CPU_USAGE,
  DASHBOARD_CARD_METRICS_QUERY,
  ALL_BROKER_DISK_USAGE,
} from "../models/queries";
import { useQuery } from "@apollo/client";
import TopicDataGrid from "../components/TopicDataGrid";

function DashboardContent() {
  const { loading, data } = useQuery(DASHBOARD_CARD_METRICS_QUERY, {
    pollInterval: 60000,
  });

  return (
    <>
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
              <RealTimeLineChart
                query={ALL_BROKER_CPU_USAGE}
                metric="cpuUsage"
                step="30s"
                duration={5}
                pollInterval={60}
                title="CPU Usage"
                yAxisLabel="% CPU Used"
                resource="broker"
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
              <RealTimeLineChart
                query={ALL_BROKER_DISK_USAGE}
                metric="JVMMemoryUsage"
                step="30s"
                duration={5}
                pollInterval={60}
                title="Disk Usage"
                yAxisLabel="% Memory Used"
                resource="broker"
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
              <TopicDataGrid />
            </Paper>
          </Grid>
        </Grid>
        {/* Consumer/Consumer Groups Components */}
        <Grid item xs={2}>
          <ConsumerCard />
        </Grid>
      </Container>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
