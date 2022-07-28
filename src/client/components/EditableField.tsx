import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface EditFieldProps {
  initial: string;
  update: (...args: unknown[]) => void;
  revert: (...args: unknown[]) => void;
  id: number | string;
}

function EditableField({ initial, update, revert, id }: EditFieldProps) {
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [draft, setDraft] = useState(initial);

  const save = () => {
    if (draft.replace(" ", "") !== initial) {
      setChanged(true);
      const replicas = draft.split(",").map((replica) => new Number(replica));
      update(id, replicas);
    }
    return setEditing(false);
  };

  const cancel = () => {
    setDraft(initial);
    setChanged(false);
    revert(id);
    if (editing) setEditing(false);
    return;
  };

  return (
    <>
      {!editing && (
        <>
          <span>{draft}</span>
          <Button
            onClick={() => setEditing(true)}
            variant="contained"
            color="success"
            size="small"
            sx={{
              color: "#F8F0E3",
              mx: 1,
              fontWeight: "bold",
              width: "100px",
              verticalAlign: "baseline",
            }}
          >
            Edit
          </Button>
          {changed && (
            <Button
              onClick={cancel}
              variant="contained"
              color="error"
              size="small"
              sx={{
                color: "#F8F0E3",
                mx: 1,
                fontWeight: "bold",
                width: "100px",
              }}
            >
              Revert
            </Button>
          )}
        </>
      )}
      {editing && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            size="small"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            margin="none"
            inputProps={{
              style: { fontSize: ".875rem", height: "1em" },
            }}
          />
          <Button
            onClick={save}
            variant="contained"
            color="success"
            size="small"
            sx={{
              color: "#F8F0E3",
              mx: 1,
              fontWeight: "bold",
              width: "100px",
            }}
          >
            Save
          </Button>
          <Button
            onClick={cancel}
            variant="contained"
            color="error"
            size="small"
            sx={{
              color: "#F8F0E3",
              mx: 1,
              fontWeight: "bold",
              width: "100px",
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}

export { EditableField };
