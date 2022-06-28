import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Title from "./Title";
import { BROKER_METRICS_QUERY } from "../models/queries";
import { useQuery } from "@apollo/client";

// onQueryCallback with use query

// data grid schema
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "topic", headerName: "Topic", width: 150 },
  {
    field: "partitionNum",
    headerName: "Partition",
    type: "number",
    width: 150,
  },
  {
    field: "partitionRep",
    headerName: "Replicas per partition",
    type: "number",
    width: 150,
  },
  {
    field: "isrPerPart",
    headerName: "# ISRs per partition",
    type: "number",
    width: 150,
  },
  {
    field: "brokersRep",
    headerName: "# Brokers with replicas",
    type: "number",
    width: 150,
  },
  { field: "logSize", headerName: "logSize", type: "number", width: 90 },
];

export default function Broker() {
  const [rowData, setRowData] = useState([]);
  const { loading, error, data } = useQuery(BROKER_METRICS_QUERY, {
    onCompleted: (data) => {
      const newRowData = data.topics.map((item, index) => {
        return {
          id: index,
          topic: item.name,
          partitionNum: item.numPartitions,
          partitionRep: item.totalReplicas,
          isrPerPart: item.totalIsrs,
          brokersRep: item.brokersWithReplicas,
          logSize: `${item.logSize} GB`,
        };
      });

      setRowData(newRowData);
      return data;
    },
  });
  console.log("this is the data", data);

  return (
    <React.Fragment>
      <Title>Kafka Cluster</Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </React.Fragment>
  );
}
