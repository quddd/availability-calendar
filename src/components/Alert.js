import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function AlertMessage(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.alert.error) {
      setOpen(true);
      setMessage(props.alert.message);
    } else {
      setOpen(false);
      setMessage("");
    }
  }, [props]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={60000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
