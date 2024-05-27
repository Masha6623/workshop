import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { child, get, getDatabase, onValue, ref, remove } from "firebase/database";
import { useState } from "react";
import { Button } from "@material-ui/core";
import FullOrderInfo from "./orderInfo/FullOrderInfo";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TableOrders({ allOrders }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderId, setOrderId] = useState("");
  const [fullOrderInfo, setFullOrderInfo] = useState([]);
  const [openFullOrderInfo, setOpenFullOrderInfo] = useState(false);

  // получение id заказа по которому кликнули и полной инфы с БД об этом заказе
  const db = getDatabase();
  function getId(e) {
    const orderId = e.currentTarget.id;
    setOrderId(orderId);

    const ordersId = ref(db, `orders/${orderId}/`);
    onValue(ordersId, (snapshot) => {
      const data = snapshot.val();
      setFullOrderInfo(data);
      setOpenFullOrderInfo(true);
    });
  }

 // удаление заказа

  const adminDeleteOrder = async () => {
    const dbRef = ref(getDatabase());

    try {
      const orderSnapshot = await get(dbRef, `orders/${orderId}`);
      const usersSnapshot = await get(dbRef, `users/${fullOrderInfo.userUid}/userOrders/${orderId}`);

      if (orderSnapshot.exists() && usersSnapshot.exists()) {
        const orderRefToRemove = child(dbRef, `orders/${orderId}`);
        const userRefToRemove = child(dbRef, `users/${fullOrderInfo.userUid}/userOrders/${orderId}`);

        await remove(orderRefToRemove);
        await remove(userRefToRemove);
        setOpenFullOrderInfo(false);          // показать Alert об успешном удалении
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  function createData(numberOrders, fullPrice, description) {
    return { numberOrders, fullPrice, description };
  }

  function createRows() {
    const orders = !allOrders ? null : Object.keys(allOrders);
    const rows = [];

    for (let i = 0; i < orders?.length; i++) {
      rows[i] = createData(
        orders[i],
        allOrders[orders[i]].fullPrice,
        <Button id={orders[i]} onClick={getId} color="secondary">
          Узнать подробнее
        </Button>
      );
    }
    return rows;
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - createRows().length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? createRows().slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : createRows()
            ).map((row) => (
              <TableRow key={row.numberOrders}>
                <TableCell component="th" scope="row">
                  {row.numberOrders}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.fullPrice}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={createRows().length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <FullOrderInfo
          openFullOrderInfo={openFullOrderInfo}
          setOpenFullOrderInfo={setOpenFullOrderInfo}
          fullOrderInfo={fullOrderInfo}
          orderId={orderId}
          adminDeleteOrder={adminDeleteOrder}
        />
      </TableContainer>
    </>
  );
}

export default TableOrders;
