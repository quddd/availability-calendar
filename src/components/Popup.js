import { Dialog, DialogTitle, DialogContent } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    borderBottom: "1px solid",
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
