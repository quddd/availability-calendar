import React, { useState } from "react";
import { takeMonth } from "../modules/calendar";
import { Grid, makeStyles } from "@material-ui/core";
import { format, isPast, isSameDay, isSameMonth } from "date-fns";

const useStyles = makeStyles((theme) => ({
  days: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: theme.spacing(6),
    minWidth: 34,
    padding: theme.spacing(1, 1),
    fontSize: theme.spacing(1.5),
    cursor: "pointer",
  },
  weekNames: {
    color: theme.palette.common.white,
    background: theme.palette.info.light,
    height: theme.spacing(4),
    minWidth: 34,
    padding: theme.spacing(0, 1),
    fontSize: theme.spacing(1.5),
  },
  currentDate: {
    background: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  notSameMonth: {
    color: theme.palette.grey[400],
  },
}));
function WeekNames() {
  const classes = useStyles();
  return (
    <Grid container wrap='nowrap' justify='flex-start'>
      {["S", "M", "T", "W", "T", "F", "S"].map((week, key) => (
        <Grid
          key={key}
          align='center'
          xs={1}
          item
          className={classes.weekNames}
        >
          {week}
        </Grid>
      ))}
    </Grid>
  );
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const classes = useStyles();
  const data = takeMonth(currentDate)();

  const dayColor = (day) => {
    if (isSameDay(day, currentDate)) return classes.currentDate;
    if (!isSameMonth(day, currentDate) || isPast(day, new Date()))
      return classes.notSameMonth;
  };

  const handleClick = (e, day) => {
    e.preventDefault();
    if (!isPast(day, new Date()) || isSameDay(day, new Date()))
      setCurrentDate(day);
  };

  return (
    <div>
      <h1> Calendar </h1>
      <WeekNames />
      {data.map((week, key) => (
        <Grid key={key} container wrap='nowrap' justify='flex-start'>
          {week.map((day, key) => (
            <Grid
              key={key}
              xs={1}
              align='center'
              item
              className={`${classes.days} ${dayColor(day)}`}
              onClick={(e) => handleClick(e, day)}
            >
              {format(day, "d")}
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
}

export default Calendar;
