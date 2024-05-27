import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { List, Popover, Typography } from "@mui/material";
import React from "react";
import FullPrice from "./info/FullPrice";
import OrderDate from "./info/OrderDate";
import PaintPrice from "./info/PaintPrice";
import MaterialPrice from "./info/MaterialPrice";
import WorkPrice from "./info/WorkPrice";
import FinalTime from "./info/FinalTime";
import OrderStatus from "./info/OrderStatus";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// анимация мод.окна
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalOrderInfo = ({
  openOrderInfo,
  setOpenOrderInfo,
  fullOrderInfo,
  orderId,
  deleteOrder,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Dialog
        open={openOrderInfo}
        disableEnforceFocus
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Информация о заказе"
      >
        <DialogTitle id="order_info">Информация о заказе</DialogTitle>
        <DialogContent>
          <Typography>
            Номер заказа: <strong>{orderId}</strong>
          </Typography>
          <List className={classes.root}>
            <OrderDate orderDate={fullOrderInfo?.dateCreateOrder} />
            <MaterialPrice materialPrice={fullOrderInfo?.materialPrice} />
            <PaintPrice paintPrice={fullOrderInfo?.paintPrice} />
            <WorkPrice workPrice={fullOrderInfo?.workPrice} />
            <FullPrice fullPrice={fullOrderInfo?.fullPrice} />
            <FinalTime finalTime={fullOrderInfo?.finalTime} />
            <OrderStatus orderStatus={fullOrderInfo?.status} />
          </List>
        </DialogContent>
        <DialogActions>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="text" {...bindTrigger(popupState)}>
                  Отменить
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Подтвердите удаление</Typography>
                  <Button onClick={deleteOrder} style={{ marginLeft: "10px" }}>
                    Удалить
                  </Button>
                  <Button
                    onClick={popupState.close}
                    style={{ float: "right", marginRight: "10px" }}
                  >
                    Закрыть
                  </Button>
                </Popover>
              </div>
            )}
          </PopupState>
          <Button variant="text" onClick={() => setOpenOrderInfo(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalOrderInfo;
