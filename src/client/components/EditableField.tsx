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
          <Button onClick={() => setEditing(true)}>Edit</Button>
          {changed && <Button onClick={cancel}>Revert</Button>}
        </>
      )}
      {editing && (
        <>
          <TextField
            size="small"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button onClick={save}>Save</Button>
          <Button onClick={cancel}>Cancel</Button>
        </>
      )}
    </>
  );
}

export { EditableField };
