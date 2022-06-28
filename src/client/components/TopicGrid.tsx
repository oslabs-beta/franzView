import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Title from "./Title";
import { BROKER_METRICS_QUERY } from "../models/queries";
import { useQuery } from "@apollo/client";

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

interface TopicGridProps {
  title?: string;
  rowCount: number;
}

export default function TopicGrid({ title, rowCount }: TopicGridProps) {
  const [rowData, setRowData] = useState([]);
  const [pageSize, setPageSize] = useState(rowCount);
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

  return (
    <div style={{ height: "100%" }}>
      <Title>{title}</Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rowData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            rowsPerPageOptions={[5, 10, 25, 50]}
            style={{ height: 52 * rowCount + 147 }}
          />
        </div>
      )}
    </div>
  );
}
