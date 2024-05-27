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

const FullTicketsInfo = ({
  openFullTicketInfo,
  setOpenFullTicketInfo,
  fullTicketInfo,
  ticketId,
  adminDeleteTicket,
}) => {
  const classes = useStyles();

  console.log(fullTicketInfo);

  const fullTicketInfoArr = !fullTicketInfo ? null : Object.keys(fullTicketInfo).map(function (key) {  // ERROR !!! 
    return [key, fullTicketInfo[key]];
  });

  return (
    <Box>
      <Dialog
        open={openFullTicketInfo}
        disableEnforceFocus
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Информация о обращении"
      >
        <DialogTitle id="ticket_info">Информация о обращении</DialogTitle>

        <DialogContent>
          <Typography>
            Номер обращения: <strong>{ticketId}</strong>
          </Typography>
          <List className={classes.root}>
            {fullTicketInfoArr?.map((item) => (
              <ListItem key={item[0]}>{`${item[0]}: ${item[1]} `}</ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="text" {...bindTrigger(popupState)}>
                  Удалить
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
                  <Button
                    onClick={adminDeleteTicket}
                    style={{ marginLeft: "10px" }}
                  >
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
          <Button variant="text" onClick={() => setOpenFullTicketInfo(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FullTicketsInfo;
