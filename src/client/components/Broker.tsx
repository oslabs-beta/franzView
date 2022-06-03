import * as React from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Title from "./Title";
// import { BROKER_METRICS_QUERY } from "../models/queries";
// import { useQuery } from "@apollo/client";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "topic", headerName: "Topic", width: 150 },
  {
    field: "partitionNum",
    headerName: "Partition",
    type: "number",
    width: 100,
  },
  {
    field: "partitionRep",
    headerName: "Replicas per partition",
    type: "number",
    width: 100,
  },
  {
    field: "isrPerPart",
    headerName: "# ISRs per partition",
    type: "number",
    width: 90,
  },
  {
    field: "brokersRep",
    headerName: "# Brokers with replicas",
    type: "number",
    width: 90,
  },
  { field: "logSize", headerName: "logSize", type: "number", width: 90 },
];

const rows = [
  {
    id: 1,
    topic: "Metamorphasis",
    partitionNum: 42,
    partitionRep: 7,
    isrPerPart: 0,
    brokersRep: 4,
    logSize: 57,
  },
  {
    id: 2,
    topic: "The_Castle",
    partitionNum: 3,
    partitionRep: 3,
    isrPerPart: 1,
    brokersRep: 3,
    logSize: 42,
  },
  {
    id: 3,
    topic: "A_Country_Doctor",
    partitionNum: 2,
    partitionRep: 2,
    isrPerPart: 0,
    brokersRep: 2,
    logSize: 5,
  },
  {
    id: 4,
    topic: "In_the_Penal_Colony",
    partitionNum: 7,
    partitionRep: 7,
    isrPerPart: 1,
    brokersRep: 1,
    logSize: 107,
  },
];

export default function Broker() {
  // const { loading, data, error } = useQuery(BROKER_METRICS_QUERY);

  // console.log("LOOK AT ME!!!!", data);

  return (
    <>
      {/* {data.values.map((test: any, index: number) => (
      <div key={index} >
        {test.name}
      </div>
    ))} */}
      <React.Fragment>
        <Title>Kafka Cluster</Title>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            // checkboxSelection
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </React.Fragment>
    </>
  );
}
