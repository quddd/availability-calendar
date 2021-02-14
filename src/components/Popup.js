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
    <Dialog open={openPopup}>
      <DialogTitle>
        <div className={classes.title}>
          <h3> Add Availability </h3>
          <CancelIcon
            color='secondary'
            fontSize='large'
            onClick={() => setOpenPopup(false)}
          />
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
