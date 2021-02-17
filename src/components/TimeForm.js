import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: theme.spacing(1),
  },
}));
function TimeForm() {
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
  return (
    <div>
      <Grid container justify='center' spacing={3}>
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
        <Grid item className={classes.textField}>
          <FormControl>
            <TextField
              id='start'
              label='From'
              variant='outlined'
              type='time'
              value={start}
              onChange={(e) => handleStart(e)}
            />
          </FormControl>
        </Grid>
        <Grid item className={classes.textField}>
          <FormControl>
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
      </Grid>
    </div>
  );
}
export default TimeForm;
