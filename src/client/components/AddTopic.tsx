import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TOPIC, CORE_ALL_BROKERS_QUERY } from "../models/queries";
import { useNavigate } from "react-router-dom";

import ConfigEntry from "./ConfigEntry";

function AddTopic() {
  const [topicName, setTopicName] = useState("");
  const [topicNameInvalid, setTopicNameInvalid] = useState(false);
  const [replicationFactor, setReplicationFactor] = useState("");
  const [replicationFactorInvalid, setReplicationFactorInvalid] =
    useState(false);
  const [numPartitions, setNumPartitions] = useState("");
  const brokers = useQuery(CORE_ALL_BROKERS_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const [addTopic, { loading, error }] = useMutation(ADD_TOPIC);
  const [configOptions, setConfigOptions] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    let invalidSubmission = false;

    if (topicName === "") {
      setTopicNameInvalid(true);
      invalidSubmission = true;
    }

    if (Number(replicationFactor) > brokers.data.brokers.length) {
      setReplicationFactorInvalid(true);
      invalidSubmission = true;
    }

    if (invalidSubmission) return;

    addTopic({
      variables: {
        name: topicName.replaceAll(" ", "-").toLowerCase(),
        replicationFactor:
          Number(replicationFactor) <= 0 ? -1 : Number(replicationFactor),
        numPartitions: Number(numPartitions) <= 0 ? -1 : Number(numPartitions),
        configEntries: configOptions,
      },
    });

    if (!loading && !error) {
      setTopicNameInvalid(false);
      setReplicationFactorInvalid(false);
      setTopicName("");
      setReplicationFactor("");
      setNumPartitions("");
      navigate("/topicslist", { replace: true });
    }
  };

  const addConfigOption = () => {
    setConfigOptions([...configOptions, { name: "", value: "" }]);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        {loading}
        <h1>Create a Topic</h1>
        <Grid
          container
          spacing={2}
          component="form"
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          onSubmit={(e) => onSubmit(e)}
        >
          <Grid item xs={12} lg={10}>
            <TextField
              required
              error={topicNameInvalid}
              helperText={topicNameInvalid && "Topic Name cannot be blank"}
              id="topic-name"
              label="Topic Name"
              placeholder="Enter name"
              autoFocus={true}
              name="topic-name"
              fullWidth
              sx={{
                display: "block",
              }}
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </Grid>
          <Box width="100%" />
          <Grid item xs={4}>
            <TextField
              error={replicationFactorInvalid}
              helperText={
                replicationFactorInvalid &&
                "Replication factor cannot be more than the number of brokers in the cluster"
              }
              id="replication-factor"
              label="Replication Factor"
              placeholder="Enter number"
              autoFocus={true}
              name="replication-factor"
              type="number"
              value={replicationFactor}
              fullWidth
              onChange={(e) => setReplicationFactor(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="partition-count"
              label="Partition Count"
              placeholder="Enter number"
              autoFocus={true}
              name="partition-count"
              type="number"
              value={numPartitions}
              fullWidth
              onChange={(e) => setNumPartitions(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} justifyContent="flex-end">
            {configOptions.length > 0 &&
              configOptions.map((input, index) => {
                return (
                  <ConfigEntry
                    key={index}
                    configs={configOptions}
                    setConfigs={setConfigOptions}
                    index={index}
                  />
                );
              })}
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button variant="contained" onClick={addConfigOption}>
              Add Config Option
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddTopic;
