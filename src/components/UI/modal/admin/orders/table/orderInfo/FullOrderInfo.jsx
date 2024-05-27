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
import { List, ListItem, Popover, Typography } from "@mui/material";
import React from "react";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { getDatabase, ref, update } from "firebase/database";

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

const FullOrderInfo = ({
  openFullOrderInfo,
  setOpenFullOrderInfo,
  fullOrderInfo,
  orderId,
  adminDeleteOrder,
}) => {
  const classes = useStyles();

  const fullOrderInfoArr = !fullOrderInfo ? null : Object.keys(fullOrderInfo).map(function (key) {
    return [key, fullOrderInfo[key]];
  });

// изменение статуса заказа

  function changeStatus(e) {  
    const buttonKey = e.currentTarget.id;

    const database = getDatabase();
    let newStatus = "";

    if (buttonKey === "orderIsReady") {
      newStatus =
        "Заказ готов, его можно забрать по адресу д.Нолька, ул.Центральная д. 28";
    }
    if (buttonKey === "sendForPrepayment") {
      newStatus = `Заказ ожидает предоплаты в размере ${
        fullOrderInfo.fullPrice / 2
      } руб. Сбербанк: номер карты 2202 2053 7802 7848, получатель: Мария Юрьевна Б., в комментарии к платежу укажите номер Вашего заказа - ${orderId}. Это ускорит процесс обработки вашего платежа.`;
    }
    if (buttonKey === "sendForExecution") {
      newStatus = "Заказ выполняется";
    }
    if (buttonKey === "refuse") {
      newStatus = "В данный момент мы не можем выполнить Ваш заказ :(";
    }
    update(ref(database, `orders/${orderId}/`), {
      status: newStatus,
    });
  }

  return (
    <Box>
      <Dialog
        open={openFullOrderInfo}
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
            {fullOrderInfoArr?.map((item) =>
              item[0] === "totalLength" ? (
                <ListItem key={item[0]}>{`${item[0]}: ${Object.keys(item[1]).map(
                  (key) => [key, item[1][key]]
                )} `}</ListItem>
              ) : (
                <ListItem key={item[0]}>{`${item[0]}: ${item[1]}; `}</ListItem>
              )
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button {...bindTrigger(popupState)}>Изменить статус</Button>
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
                  <Button
                    id="orderIsReady"
                    onClick={changeStatus}
                    style={{ margin: "10px" }}
                  >
                    Заказ готов
                  </Button>
                  <Button
                    id="sendForPrepayment"
                    onClick={changeStatus}
                    style={{ margin: "10px" }}
                  >
                    Отправить на предоплату
                  </Button>
                  <Button
                    id="sendForExecution"
                    onClick={changeStatus}
                    style={{ margin: "10px" }}
                  >
                    Отправить на исполнение
                  </Button>
                  <Button
                    id="refuse"
                    onClick={changeStatus}
                    style={{ margin: "10px" }}
                  >
                    Отказать
                  </Button>
                  <Button onClick={popupState.close} style={{ margin: "10px" }}>
                    Закрыть
                  </Button>
                </Popover>
              </div>
            )}
          </PopupState>

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
                  <Typography sx={{ p: 2 }}>Подтвердите отмену заказа</Typography>
                  <Button
                    onClick={adminDeleteOrder}
                    style={{ marginLeft: "10px" }}
                  >
                    Отменить
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
          <Button variant="text" onClick={() => setOpenFullOrderInfo(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FullOrderInfo;
