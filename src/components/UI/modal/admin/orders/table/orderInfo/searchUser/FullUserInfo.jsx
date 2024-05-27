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
import { child, getDatabase, ref, set, update } from "firebase/database";

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

const FullUserInfo = ({
  openFullUserInfo,
  setOpenFullUserInfo,
  inpUserUid,
  userAllInfo,
}) => {
  const classes = useStyles();

  const fullUserInfoArr = Object.keys(userAllInfo).map(function (key) {
    return [key, userAllInfo[key]];
  });

  function changeRole(e) {
    const buttonKey = e.currentTarget.id;

    const database = getDatabase();
    let newRole = "";

    if (buttonKey === "admin") {
      newRole = "admin";
    }
    if (buttonKey === "user") {
      newRole = "user";
    }
    if (buttonKey === "blocked") {
      newRole = "blocked";
    }

    update(ref(database, `users/${inpUserUid}/`), {
      role: newRole,
    });
  }

  return (
    <Box>
      <Dialog
        open={openFullUserInfo}
        disableEnforceFocus
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Информация о пользователе"
      >
        <DialogTitle id="user_info">Информация о пользователе</DialogTitle>

        <DialogContent>
          <Typography>
            Uid: <strong>{inpUserUid}</strong>
          </Typography>
          <List className={classes.root}>
            {fullUserInfoArr.map((item) =>
              item[0] === "userOrders" ? (
                <ListItem key={item[0]}>{`${item[0]}: ${Object.keys(
                  item[1]
                ).map((key) => [key])}`}</ListItem>
              ) : (
                <ListItem key={item[0]}>{`${item[0]}: ${item[1]}`}</ListItem>
              )
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="text" {...bindTrigger(popupState)}>
                  Изменить роль
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
                  <Button
                    id="admin"
                    onClick={changeRole}
                    style={{ margin: "10px" }}
                  >
                    Admin
                  </Button>
                  <Button
                    id="user"
                    onClick={changeRole}
                    style={{ margin: "10px" }}
                  >
                    User
                  </Button>
                  <Button
                    id="blocked"
                    onClick={changeRole}
                    style={{ margin: "10px" }}
                  >
                    Blocked
                  </Button>
                  <Button onClick={popupState.close} style={{ margin: "10px" }}>
                    Закрыть
                  </Button>
                </Popover>
              </div>
            )}
          </PopupState>
          <Button variant="text" onClick={() => setOpenFullUserInfo(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FullUserInfo;
