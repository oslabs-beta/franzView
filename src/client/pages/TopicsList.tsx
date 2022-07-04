import React from "react";
import TopicGrid from "../components/TopicGrid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const TopicsList = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Topics</h1>
          <Button color="success" variant="contained" href="/addtopic">
            Add Topic
          </Button>
        </div>
        <TopicGrid rowCount={10} />
      </Container>
    </>
  );
};

export default TopicsList;
