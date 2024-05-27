import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableOrders from "./table/TableOrders";
import { getDatabase, onValue, ref } from "firebase/database";
import { auth } from "../../../../config/firebase";

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

const UserProfile = ({ openProfile, setOpenProfile, email, form, openSubmitSuccess }) => {
  const classes = useStyles();
  const [ordersId, setOrdersId] = useState([]);

  useEffect(() => {
    form.setValue("email", email); // запись email в result
  }, [openSubmitSuccess, email, form]);

  const userId = auth.currentUser?.uid;
  useEffect(() => {
    const db = getDatabase();
    const ordersId = ref(db, `users/${userId}/userOrders/`);
    onValue(ordersId, (snapshot) => {
      const data = snapshot.val();
      setOrdersId(data);
    });
  }, [userId]);

  return (
    <>
      <Dialog
        open={openProfile}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Личный кабинет"
      >
        <DialogTitle id="user_profile">Личный кабинет</DialogTitle>
        <form key={3}>
          <DialogContent>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Ваш email: <Button color="secondary">{email}</Button>
            </Typography>
            <TableOrders ordersId={ordersId} userId={userId}/>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpenProfile(false)}>
              Закрыть
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserProfile;
