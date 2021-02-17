import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
function Popup(props) {
  const { children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      onClose={() => setOpenPopup(false)}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle disableTypography>
        <Typography component='h6' variant='h6'>
          Add Availability
        </Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpenPopup(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
