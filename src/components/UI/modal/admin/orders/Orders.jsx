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
import TableOrders from "./table/TableOrders";
  
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
  
  const Orders = ({ openOrders, setOpenOrders, allOrders }) => {
    const classes = useStyles();
  
    return (
      <>
        <Dialog
          open={openOrders}
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
          <DialogTitle id="orders">Заказы</DialogTitle>
          <DialogContent>
            <TableOrders allOrders={allOrders}/>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpenOrders(false)}>
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default Orders;