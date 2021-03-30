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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import DeleteIcon from "@material-ui/icons/Delete";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Popup from "./Popup";
import TimeForm from "./TimeForm";

const useStyles = makeStyles((theme) => ({
  days: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: "12vh",
    width: "14vw",
    padding: theme.spacing(0, 1),
    fontSize: "calc(6px + 1vmin)",
    cursor: "pointer",
  },
  weekNames: {
    height: "4vh",
    width: "14vw",
    padding: theme.spacing(0, 1),
    fontSize: theme.spacing(1.5),
  },
  currentDate: {
    background: "#266EF6",
    color: theme.palette.common.white,
  },
  notSameMonth: {
    color: theme.palette.grey[400],
  },
  calendar: {
    maxWidth: 850,
  },
  table: {
    marginTop: theme.spacing(2),
    maxHeight: "50vh",
  },
  deleteIcon: {
    color: "#800080",
  },
  badge: {
    marginRight: theme.spacing(0.5),
    fontSize: "calc(1px + 1vmin)",
    color: "#800080",
  },
  events: {
    fontSize: "calc(4px + 1vmin)",
    fontWeight: "500",
    "&:hover": {
      background: "#A9BFCA",
      borderRadius: "2px",
    },
  },
}));

function Calendar({ availability, setAvailability }) {
  const [currentDate, setCurrentDate] = useState(new Date());
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
  const handleDelete = (e, key) => {
    e.preventDefault();
    setAvailability([
      ...availability.slice(0, key),
      ...availability.slice(key + 1),
    ]);
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
      <Grid container direction='row' spacing={1} justify='center'>
        <Grid container item className={classes.calendar}>
          <Grid
            container
            item
            spacing={0}
            alignItems='center'
            justify='center'
            className={classes.controls}
          >
            <IconButton color='primary' onClick={prevMonth}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography component='p' variant='h6'>
              {format(currentDate, "MMM yy")}
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
                  {format(day, "d")}
                  {/* filter availability for array*/}
                  {availability
                    .filter((item) => isSameDay(item.start, day))
                    .slice(0, 3)
                    .map((date, key) => (
                      <Grid key={key} container direction='row'>
                        <Typography
                          className={classes.events}
                          variant='body2'
                          component='p'
                          display='block'
                          noWrap
                          align='left'
                        >
                          <FiberManualRecordIcon className={classes.badge} />
                          {format(date.start, "h:mmaaa")}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Typography align='center' variant='h6' component='p'>
            Your current availability
          </Typography>
          <TableContainer
            className={classes.table}
            component={Paper}
            elevation={6}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date </TableCell>
                  <TableCell align='right'>Start</TableCell>
                  <TableCell align='right'>End</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availability.map((data, key) => (
                  <TableRow key={key}>
                    <TableCell component='th' scope='row'>
                      {format(data.start, "dd MMMM, yyyy")}
                    </TableCell>
                    <TableCell align='right'>
                      {format(data.start, "haaa")}
                    </TableCell>
                    <TableCell align='right'>
                      {format(data.end, "haaa")}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        onClick={(e) => {
                          handleDelete(e, key);
                        }}
                      >
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
