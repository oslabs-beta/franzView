import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Title from "./Title";
import { TOPIC_DATAGRID_QUERY, DELETE_TOPIC } from "../models/queries";
import { useQuery } from "@apollo/client";
import ConfirmationDialog from "./ConfirmationDialog";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

// onQueryCallback with use query

// data grid schema
// const columns: GridColDef[] = [
// 	{ field: "topic", headerName: "Topic", width: 150 },
// 	{
// 		field: "partitionNum",
// 		headerName: "Number of Partitions",
// 		type: "number",
// 		width: 150,
// 	},
// 	{
// 		field: "partitionRep",
// 		headerName: "Replicas per partition",
// 		type: "number",
// 		width: 150,
// 	},
// 	{
// 		field: "underMinISR",
// 		headerName: "Under Min ISR",
// 		type: "number",
// 		width: 150,
// 	},
// 	{ field: "logSize", headerName: "Log Size(GB)", type: "number", width: 120 },
// 	{
// 		field: "delete",
// 		headerName: "",
// 		filterable: false,
// 		align: "center",
// 		width: 180,
// 		renderCell: (params) => {
// 			return params.value ? (
// 				<ConfirmationDialog
// 					title={`Delete ${params.row.topic}?`}
// 					content={`Are you sure you want to delete topic: ${params.row.topic}? \n
//         Enter the topic name below to confirm. This is irreversible!`}
// 					label='Delete'
// 					actions={DELETE_TOPIC}
// 					control={params.row.topic}
// 					args={{ name: params.row.topic }}
// 					variant='contained'
// 					color='error'
// 					cta='DELETE'
// 					disabled={!params.value}
// 					update={params.row.update}
// 				/>
// 			) : (
// 				<ConfirmationDialog
// 					title={`Delete ${params.row.topic}?`}
// 					content={`Are you sure you want to delete topic: ${params.row.topic}? \n
//         Enter the topic name below to confirm. This is irreversible!`}
// 					label='Delete'
// 					actions={DELETE_TOPIC}
// 					control={params.row.topic}
// 					args={{ name: params.row.topic }}
// 					variant='contained'
// 					color='error'
// 					cta='DELETE'
// 					disabled={params.value}
// 					update={params.row.update}
// 				/>
// 			);
// 		},
// 	},
// 	{
// 		field: "reassignPartitions",
// 		headerName: "",
// 		filterable: false,
// 		align: "center",
// 		width: 180,
// 	},
// ];

interface TopicGridProps {
  title?: string;
  rowCount: number;
}

export default function TopicGrid({ title, rowCount }: TopicGridProps) {
  const [rowData, setRowData] = useState([]);
  const [pageSize, setPageSize] = useState(rowCount);
  const navigate = useNavigate();
  const { loading, data, refetch } = useQuery(TOPIC_DATAGRID_QUERY);

  React.useEffect(() => {
    if (loading) return;
    else {
      const newRowData = data.topics.map((item, index) => {
        return {
          id: index,
          topic: item.name,
          partitionNum: item.numPartitions,
          partitionRep: item.totalReplicas,
          underMinISR: `${item.totalIsrs - item.totalReplicas}`,
          delete: data.cluster.deleteTopic,
          logSize: item.logSize,
          update: refetch,
        };
      });

      setRowData(newRowData);
    }
  }, [data]);
  const columns: GridColDef[] = [
    { field: "topic", headerName: "Topic", width: 150 },
    {
      field: "partitionNum",
      headerName: "Number of Partitions",
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
      field: "underMinISR",
      headerName: "Under Min ISR",
      type: "number",
      width: 150,
    },
    {
      field: "logSize",
      headerName: "Log Size(GB)",
      type: "number",
      width: 120,
    },
    {
      field: "delete",
      headerName: "",
      filterable: false,
      align: "center",
      width: 180,
      renderCell: (params) => {
        return params.value ? (
          <ConfirmationDialog
            title={`Delete ${params.row.topic}?`}
            content={`Are you sure you want to delete topic: ${params.row.topic}? \n
        Enter the topic name below to confirm. This is irreversible!`}
            label="Delete"
            actions={DELETE_TOPIC}
            control={params.row.topic}
            args={{ name: params.row.topic }}
            variant="contained"
            color="error"
            cta="DELETE"
            disabled={!params.value}
            update={params.row.update}
          />
        ) : (
          <ConfirmationDialog
            title={`Delete ${params.row.topic}?`}
            content={`Are you sure you want to delete topic: ${params.row.topic}? \n
        Enter the topic name below to confirm. This is irreversible!`}
            label="Delete"
            actions={DELETE_TOPIC}
            control={params.row.topic}
            args={{ name: params.row.topic }}
            variant="contained"
            color="error"
            cta="DELETE"
            disabled={params.value}
            update={params.row.update}
          />
        );
      },
    },
    {
      field: "reassignPartitions",
      headerName: "",
      filterable: false,
      align: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`../reassign/${params.row.topic}`)}
          >
            REASSIGN PARTITIONS
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      {title && <Title>{title}</Title>}
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
