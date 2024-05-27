import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@material-ui/core";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
} from "firebase/database";
import ModalOrderInfo from "../orderInfo/ModalOrderInfo";
import Preloader from "../../../Preloader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableOrders({ ordersId, userId }) {
  const [fullOrderInfo, setFullOrderInfo] = useState([]);
  const [openOrderInfo, setOpenOrderInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  function createData(numberOrders, description) {
    return { numberOrders, description };
  }

  const db = getDatabase();
  
  function getId(e) {
    const orderId = e.currentTarget.id;
    setOrderId(orderId);
    setIsLoading(true);

    const ordersId = ref(db, `orders/${orderId}/`);
    onValue(ordersId, (snapshot) => {
      const data = snapshot.val();
      setFullOrderInfo(data);
      setIsLoading(false);
      setOpenOrderInfo(true);
    });
  }

  function createRows() {
    const orders = Object.keys(ordersId);
    const rows = [];

    for (let i = 0; i < orders.length; i++) {
      rows[i] = createData(
        orders[i],
        <Button id={orders[i]} onClick={getId} color="secondary">
          Узнать подробнее
        </Button>
      );
    }
    return rows;
  }

  const deleteOrder = async () => {
    const dbRef = ref(getDatabase());

    try {
      const orderSnapshot = await get(dbRef, `orders/${orderId}`);
      const usersSnapshot = await get(dbRef, `users/${userId}/userOrders/${orderId}`);

      if (orderSnapshot.exists() && usersSnapshot.exists()) {
        const orderRefToRemove = child(dbRef, `orders/${orderId}`);
        const userRefToRemove = child(dbRef, `users/${userId}/userOrders/${orderId}`);

        await remove(orderRefToRemove);
        await remove(userRefToRemove);
        setOpenOrderInfo(false);          // показать Alert об успешном удалении
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Номер заказа</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersId ? (
              createRows().map((row) => (
                <StyledTableRow key={row.numberOrders}>
                  <StyledTableCell component="th" scope="row">
                    {row.numberOrders}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Typography style={{ margin: "8px" }}>
                У Вас нет заказов
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading ? (
        <Preloader />
      ) : (
        <ModalOrderInfo
          openOrderInfo={openOrderInfo}
          setOpenOrderInfo={setOpenOrderInfo}
          fullOrderInfo={fullOrderInfo}
          orderId={orderId}
          deleteOrder={deleteOrder}
        />
      )}
    </>
  );
}

export default TableOrders;
