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
import { Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import Orders from "./orders/Orders";
import Appeals from "./appeals/Appeals";
import UserSearch from "./orders/table/orderInfo/searchUser/UserSearch";
import { getDatabase, onValue, ref } from "firebase/database";

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

const AdminProfile = ({ openAdminProfile, setOpenAdminProfile }) => {
  const classes = useStyles();
  const [openOrders, setOpenOrders] = useState(false);
  const [openAppeals, setOpenAppeals] = useState(false);
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {                            // получение ВСЕХ заказов с БД
    const db = getDatabase();
    const ordersId = ref(db, `orders/`);
    onValue(ordersId, (snapshot) => {
      const data = snapshot.val();
      setAllOrders(data);
    });
  }, []);

  useEffect(() => {                            // получение ВСЕХ обращений с БД
    const db = getDatabase();
    const ticketsId = ref(db, `tickets/`);
    onValue(ticketsId, (snapshot) => {
      const data = snapshot.val();
      setAllTickets(data);
    });
  }, []);

  return (
    <>
      <Dialog
        open={openAdminProfile}
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
        <DialogContent>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Ваш email: <Button color="secondary">admin</Button>
          </Typography>
          <Box style={{ display: "grid" }}>
            <Button onClick={() => setOpenOrders(true)} color="secondary">Показать заказы</Button>
            <Button onClick={() => setOpenAppeals(true)} color="secondary">Показать обращения</Button>
            <Button onClick={() => setOpenUserSearch(true)} color="secondary">Найти пользователя</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpenAdminProfile(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
      <Orders openOrders={openOrders} setOpenOrders={setOpenOrders} allOrders={allOrders}/>
      <Appeals openAppeals={openAppeals} setOpenAppeals={setOpenAppeals} allTickets={allTickets}/>
      <UserSearch openUserSearch={openUserSearch} setOpenUserSearch={setOpenUserSearch}/>
    </>
  );
};

export default AdminProfile;
