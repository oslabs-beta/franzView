import React from "react";
import TopicGrid from "../components/TopicGrid";

const TopicsList = () => {
  return (
    <>
      <h1>Topics</h1>
      <TopicGrid title="Topics" rowCount={10} />
    </>
  );
};

export default TopicsList;
