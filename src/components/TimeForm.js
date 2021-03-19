import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  makeStyles,
  Divider,
  Button,
  Typography,
} from "@material-ui/core";
import { format, getMonth, getYear, getDate } from "date-fns";
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
    setStart(e.target.value);
  };
  const handleEnd = (e) => {
    setEnd(e.target.value);
  };
  const handleSubmit = async () => {
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
    setAvailability([...availability, data]);
    setAlert({
      alert: true,
      message: " Availability Added",
      severity: "success",
    });
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
