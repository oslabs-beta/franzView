import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AddTopic() {
  const [topicName, setTopicName] = useState("");
  const [replicationFactor, setReplicationFactor] = useState("");
  const [partitionCount, setPartitionCount] = useState("");

  const onSubmit = () => {
    window.alert(`The topic name is: ${topicName}
    The replication factor is ${replicationFactor}
    The partition count is ${partitionCount}`);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Create a Topic</h1>
        <Grid
          container
          spacing={2}
          component="form"
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          onSubmit={onSubmit}
        >
          <Grid item xs={12} lg={10}>
            <TextField
              required
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
              id="replication-factor"
              label="Replication Factor"
              placeholder="Enter number"
              autoFocus={true}
              name="replication-factor"
              type="number"
              value={partitionCount}
              fullWidth
              onChange={(e) => setPartitionCount(e.target.value)}
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
              value={replicationFactor}
              fullWidth
              onChange={(e) => setReplicationFactor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddTopic;
