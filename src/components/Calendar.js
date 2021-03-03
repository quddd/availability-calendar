import React, { useState } from "react";
import { takeMonth } from "../modules/calendar";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  addMonths,
  endOfMonth,
  format,
  isPast,
  isSameDay,
  isSameMonth,
  subMonths,
} from "date-fns";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Popup from "./Popup";
import TimeForm from "./TimeForm";

const useStyles = makeStyles((theme) => ({
  days: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: theme.spacing(6),
    minWidth: 45,
    padding: theme.spacing(0, 1),
    fontSize: "calc(5px + 1vmin)",
    cursor: "pointer",
  },
  weekNames: {
    color: theme.palette.common.white,
    background: theme.palette.info.light,
    height: theme.spacing(4),
    minWidth: 45,
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
  calendar: {
    maxWidth: 700,
  },
}));

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  const data = takeMonth(currentDate)();

  const dayColor = (day) => {
    if (isSameDay(day, currentDate)) return classes.currentDate;
    if (!isSameMonth(day, currentDate) || isPast(day))
      return classes.notSameMonth;
  };

  const handleClick = (e, day) => {
    e.preventDefault();
    if (!isPast(day) || isSameDay(day, new Date())) setCurrentDate(day);
  };

  const prevMonth = () => {
    const endOfPrevMonth = endOfMonth(subMonths(currentDate, 1));
    if (!isPast(endOfPrevMonth)) {
      setCurrentDate(endOfPrevMonth);
    }
    return;
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const today = () => {
    setCurrentDate(new Date());
  };
  const WeekNames = () => {
    return (
      <Grid container wrap='nowrap'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((week, key) => (
          <Grid
            key={key}
            md={2}
            align='center'
            item
            className={classes.weekNames}
          >
            {week}
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <div>
      <div className={classes.calendar}>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
          className={classes.controls}
        >
          <IconButton color='primary' onClick={prevMonth}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography component='h5' variant='h5'>
            {format(currentDate, "MMMM yyyy")}
          </Typography>
          <IconButton color='primary' onClick={nextMonth}>
            <NavigateNextIcon />
          </IconButton>
          <ButtonGroup size='small' variant='contained' color='primary'>
            <Button onClick={today}>Today</Button>
            <Button onClick={() => setOpenPopup(true)}> + </Button>
          </ButtonGroup>
        </Grid>
        <WeekNames />
        {data.map((week, key) => (
          <Grid key={key} container wrap='nowrap'>
            {week.map((day, key) => (
              <Grid
                key={key}
                md={2}
                align='right'
                item
                className={`${classes.days} ${dayColor(day)}`}
                onClick={(e) => handleClick(e, day)}
              >
                {format(day, "dd")}
              </Grid>
            ))}
          </Grid>
        ))}
        <div>
          {availability.map((data, key) => (
            <div>
              <ul>{format(data.date, "dd MMMM, yyyy")}</ul>
              <li>{data.start}</li>
              <li>{data.end}</li>
            </div>
          ))}
        </div>
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TimeForm
          selectedDate={currentDate}
          availability={availability}
          setAvailability={setAvailability}
        />
      </Popup>
    </div>
  );
}

export default Calendar;
