import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import {
  format,
  getMonth,
  getYear,
  getDate,
  isPast,
  isSameDay,
  isAfter,
} from "date-fns";
import Alert from "./Alert";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2),
  },
}));
function TimeForm({ selectedDate, availability, setAvailability }) {
  const [checked, setChecked] = useState(false);
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("16:00");
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    severity: "",
  });
  const classes = useStyles();

  //change start and end when checked changes
  useEffect(() => {
    if (checked === true) {
      setStart("00:00");
      setEnd("23:59");
    } else if (checked === false) {
      setStart("08:00");
      setEnd("16:00");
    }
  }, [checked]);

  const handleCheck = () => {
    setChecked(!checked);
  };
  const handleStart = (e) => {
    setAlert({
      alert: false,
      message: "",
      severity: "",
    });
    setStart(e.target.value);
  };
  const handleEnd = (e) => {
    setAlert({
      alert: false,
      message: "",
      severity: "",
    });
    setEnd(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //Date checking
    if (!selectedDate) {
      setAlert({
        alert: true,
        message: "Please Select Date!",
        severity: "error",
      });
      return;
    }
    if (isPast(selectedDate) && !isSameDay(selectedDate, new Date())) {
      setAlert({
        alert: true,
        message: "Can't add availability to past date",
        severity: "error",
      });
      return;
    }
    //check if start time is empty
    if (start === "") {
      setAlert({
        alert: true,
        message: "Please provide valid start time",
        severity: "error",
      });
      return;
    }
    //check if end time is empty
    if (end === "") {
      setAlert({
        alert: true,
        message: "Please provide valid end time",
        severity: "error",
      });
      return;
    }
    const month = getMonth(selectedDate); // extract month, year and date
    const year = getYear(selectedDate);
    const date = getDate(selectedDate);

    const start_hour = parseInt(start.substring(0, 2)); // extract start hour and end hour
    const start_minute = parseInt(start.substring(3));
    const end_hour = parseInt(end.substring(0, 2));
    const end_minute = parseInt(end.substring(3));
    const data = {
      start: new Date(year, month, date, start_hour, start_minute),
      end: new Date(year, month, date, end_hour, end_minute),
    };
    /** check if the dates created are correct. This is mostly for safari 
      Safari on Mac doesn't support the date/time pickers. It just display a text input field
      This is to prevent adding invalid dates to the availability
    */
    if (data.start == "Invalid Date") {
      setAlert({
        alert: true,
        message: "Start time must be in format HH:MM",
        severity: "error",
      });
      return;
    }
    if (data.end == "Invalid Date") {
      setAlert({
        alert: true,
        message: "End time must be in format HH:MM",
        severity: "error",
      });
      return;
    }
    //check if start date is after end date
    if (isAfter(data.start, data.end)) {
      setAlert({
        alert: true,
        message: "Invalid time interval. Start Time cannot be after End Time",
        severity: "error",
      });
      return;
    }
    setAvailability([...availability, data]);
    setAlert({
      alert: true,
      message: " Availability Added",
      severity: "success",
    });
    return;
  };
  return (
    <div>
      <Grid container>
        <Grid item container justify='center'>
          <Typography variant='body1' component='h4'>
            Date: {format(selectedDate, "dd MMMM, yyyy")}
          </Typography>
        </Grid>
        <Grid item container justify='center'>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                name='checked'
                color='primary'
              />
            }
            label='All day'
          />
        </Grid>
        <Grid item container justify='center'>
          <FormControl className={classes.textField}>
            <TextField
              id='start'
              label='From'
              variant='outlined'
              type='time'
              value={start}
              onChange={(e) => handleStart(e)}
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <TextField
              id='end'
              label='To'
              variant='outlined'
              type='time'
              value={end}
              onChange={(e) => handleEnd(e)}
            />
          </FormControl>
        </Grid>
        <Grid item container justify='center'>
          <Button color='primary' variant='contained' onClick={handleSubmit}>
            Add
          </Button>
        </Grid>
        <Alert alert={alert} />
      </Grid>
    </div>
  );
}
export default TimeForm;
