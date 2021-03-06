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
import Popup from "./Popup";
import TimeForm from "./TimeForm";

const useStyles = makeStyles((theme) => ({
  days: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: "10vh",
    minWidth: 50,
    padding: theme.spacing(0, 1),
    fontSize: "calc(3px + 1vmin)",
    cursor: "pointer",
  },
  weekNames: {
    color: theme.palette.common.white,
    background: "#262626",
    height: "4vh",
    minWidth: 50,
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
    maxWidth: 700,
  },
  table: {
    marginTop: theme.spacing(2),
    maxHeight: "40vh",
    width: 400,
  },
  deleteIcon: {
    color: "#800080",
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
                  {format(day, "d")}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Typography align='center' variant='h6' component='h6'>
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
                      {format(data.date, "dd MMMM, yyyy")}
                    </TableCell>
                    <TableCell align='right'>{data.start}</TableCell>
                    <TableCell align='right'>{data.end}</TableCell>
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
