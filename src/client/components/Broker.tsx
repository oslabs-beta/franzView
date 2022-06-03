import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Title from "./Title";
import { BROKER_METRICS_QUERY } from "../models/queries";
import { useQuery } from "@apollo/client";
import { IndexRouteProps } from "react-router";

// onQueryCallback with use query

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

// const test = {
//   "data": {
//     "topics": [
//       {
//         "name": "__consumer_offsets",
//         "numPartitions": 50,
//         "totalReplicas": 100,
//         "totalIsrs": 100,
//         "brokersWithReplicas": [
//           1,
//           2,
//           3
//         ],
//         "logSize": 0
//       },
//       {
//         "name": "stackoverflow-test",
//         "numPartitions": 1,
//         "totalReplicas": 3,
//         "totalIsrs": 3,
//         "brokersWithReplicas": [
//           3
//         ],
//         "logSize": 0
//       },
//       {
//         "name": "stackoverflow",
//         "numPartitions": 3,
//         "totalReplicas": 9,
//         "totalIsrs": 9,
//         "brokersWithReplicas": [
//           1,
//           2,
//           3
//         ],
//         "logSize": 2.67
//       }
//     ]
//   }
// }

type test = {
  id: number;
  topic: string;
  partitionNum: number;
  partitionRep: number;
  isrPerPart: number;
  brokersRep: number[];
  logSize: number;
};

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
          logSize: item.logSize,
        };
      });

      setRowData(newRowData);
      return data;
    },
  });
  console.log("this is the data", data);

  function BrokerData() {
    const testData = [];
    if (loading) return <p>Loading...</p>;
    data.topics.map((item, index) => {
      rows.push({
        id: index,
        topic: item.name,
        partitionNum: item.numPartitions,
        partitionRep: item.totalReplicas,
        isrPerPart: item.totalIsrs,
        brokersRep: item.brokersWithReplicas,
        logSize: item.logSize,
      });
    });
    return testData;
  }

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
