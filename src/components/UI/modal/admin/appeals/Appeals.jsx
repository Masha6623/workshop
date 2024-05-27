import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    makeStyles,
  } from "@material-ui/core";
  import { forwardRef } from "react";
import TableTickets from "./table/TableTickets";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  
  // анимация мод.окна
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const Appeals = ({ openAppeals, setOpenAppeals, allTickets }) => {
    const classes = useStyles();
  
    return (
      <>
        <Dialog
          open={openAppeals}
          PaperProps={{
            style: {
              backgroundColor: "#ffffff",
              boxShadow: "none",
            },
          }}
          TransitionComponent={Transition}
          className={classes.root}
          aria-labelledby="Заказы"
        >
          <DialogTitle id="appeals">Обращения</DialogTitle>
          <DialogContent>
            <TableTickets allTickets={allTickets}/>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpenAppeals(false)}>
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default Appeals;