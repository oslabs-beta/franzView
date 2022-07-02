import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validate } from "../utils/validate";
import { DialogProps } from "../../types/types";
import { useMutation } from "@apollo/client";

export default function ConfirmationDialog({
  open,
  setOpen,
  title,
  content,
  label,
  actions,
  control,
  args,
}: DialogProps) {
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState(false);
  const [mutation, { loading, error }] = useMutation(actions);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validate(value, control)) {
      mutation({
        variables: {
          ...args,
        },
      });
      if (!loading && !error) {
        setValue("");
        setFormError(false);
        handleClose();
      }
    } else {
      setFormError(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <TextField
          error={formError}
          autoFocus
          margin="dense"
          id={label.replace("", "_")}
          label={label}
          fullWidth
          variant="standard"
          value={value}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
