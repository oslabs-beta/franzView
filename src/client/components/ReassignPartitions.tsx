import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { TOPIC_QUERY } from "../models/queries";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EditableField } from "./EditableField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

function ReassignPartitions() {
  const { topicName } = useParams();
  const [initial, setInitial] = useState([]);
  const [proposed, setProposed] = useState([]);
  const navigate = useNavigate();
  const { data, loading } = useQuery(TOPIC_QUERY, {
    variables: {
      name: topicName,
    },
  });

  useEffect(() => {
    if (loading) return;
    else {
      const { partitions } = data.topic;
      const rows = partitions
        .map(({ partitionId, replicas, leader }) => {
          return {
            partitionId,
            replicas: replicas.map((broker) => broker.brokerId),
            leader: leader.brokerId,
          };
        })
        .sort((a, b) => a.partitionId - b.partitionId);
      setInitial(rows);
      return;
    }
  }, [data]);

  const newAssignment = (partition: number, replicas: [number]): void => {
    const replicaAssignment = {
      partition,
      replicas,
    };

    return setProposed([...proposed, replicaAssignment]);
  };

  const deleteAssignment = (partition: number): void => {
    const draftProposed = proposed;

    return setProposed(
      draftProposed.filter(
        (replicaAssignment) => replicaAssignment.partition !== partition
      )
    );
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <h1>Reassign Partitions for topic: {topicName}</h1>
        <TableContainer
          sx={{ width: "max-content" }}
          component={Paper}
          elevation={20}
        >
          <Table sx={{ width: "max-content" }}>
            <TableHead>
              <TableRow>
                <TableCell>Partition ID</TableCell>
                <TableCell>Leader</TableCell>
                <TableCell>Replicas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                initial.map((row) => {
                  return (
                    <TableRow key={row.partitionId}>
                      <TableCell>{row.partitionId}</TableCell>
                      <TableCell>{row.leader}</TableCell>
                      <TableCell>
                        <EditableField
                          id={row.partitionId}
                          update={newAssignment}
                          revert={deleteAssignment}
                          initial={row.replicas.toString()}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          color="success"
          variant="contained"
          sx={{ color: "#F8F0E3", m: 1, fontWeight: "bold", width: "100px" }}
        >
          Save
        </Button>
        <Button
          onClick={() => navigate(-1)}
          color="error"
          variant="contained"
          sx={{ color: "#F8F0E3", m: 1, fontWeight: "bold", width: "100px" }}
        >
          Cancel
        </Button>
      </Container>
    </>
  );
}

export { ReassignPartitions };
