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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2),
  },
}));
function TimeForm({ selectedDate, availability, setAvailability }) {
  const [checked, setChecked] = useState(false);
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("16:00");
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
  const handleSubmit = () => {
    const data = {
      date: selectedDate,
      start: start,
      end: end,
    };
    setAvailability([...availability, data]);
  };
  return (
    <div>
      <Grid container>
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
      </Grid>
    </div>
  );
}
export default TimeForm;
