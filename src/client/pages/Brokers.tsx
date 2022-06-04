import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "../components/Searchbar";
import { CORE_ALL_BROKERS_QUERY } from "../models/queries";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MetricsCard from "../components/MetricsCard";
import { useQuery } from "@apollo/client";
import RealTimeLineChart from "../components/RealTimeLineChart";
import { ALL_BROKERS_TIME_MS, AVERAGE_TOTALTIMEMS } from "../models/queries";

const Brokers = () => {
  const produce = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "Produce",
    },
    pollInterval: 20000,
  });

  const consumer = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "FetchConsumer",
    },
    pollInterval: 20000,
  });

  const follower = useQuery(AVERAGE_TOTALTIMEMS, {
    variables: {
      request: "FetchFollower",
    },
    pollInterval: 20000,
  });
  // const {loading, error, data } = useQuery(ALL_BROKERS_TIME_MS, {
  //   pollInterval:60000,
  // onCompleted: data => {
  // 	const networkRequestTimeMs = {
  //     produceTime: 0,
  //     consumerTime: 0,
  //     followerTime: 0
  //   };
  // 	let produceTime = 0;
  // 	let consumerTime = 0;
  // 	let followerTime = 0;
  // 	data.brokers.forEach(element => {
  // 		produceTime += element.produceTotalTimeMs.totalTimeMs;
  // 		consumerTime += element.consumerTotalTimeMs.totalTimeMs;
  // 		followerTime += element.followerTotalTimeMs.totalTimeMs;
  // 	});
  // 	networkRequestTimeMs.produceTime = produceTime/data.brokers.length;
  // 	networkRequestTimeMs.consumerTime = consumerTime/data.brokers.length;
  // 	networkRequestTimeMs.followerTime = followerTime/data.brokers.length;

  // 	return networkRequestTimeMs;
  // }
  // });

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
                value={
                  produce.loading
                    ? "Loading..."
                    : produce.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Produce Request (TotalTimeMs)"
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
                value={
                  consumer.loading
                    ? "Loading..."
                    : consumer.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Consumer Request (TotalTimeMs)"
                toBe="milliseconds"
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
                  follower.loading
                    ? "Loading..."
                    : follower.data.totalTimeMs.totalTimeMs.toFixed(2)
                }
                title="Follower Request (TotalTimeMs)"
                toBe="milliseconds"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Brokers;
