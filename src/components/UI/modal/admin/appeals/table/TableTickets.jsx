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
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
} from "firebase/database";
import { useState } from "react";
import { Button } from "@material-ui/core";
import FullTicketsInfo from "./FullTicketsInfo";
import Preloader from "../../../../Preloader";

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

function TableTickets({ allTickets }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ticketId, setTicketId] = useState("");
  const [fullTicketInfo, setFullTicketsInfo] = useState([]);
  const [openFullTicketInfo, setOpenFullTicketInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // получение id обращения по которому кликнули и полной инфы с БД об этом обращении
  const db = getDatabase();

  function getId(e) {
    const ticketId = e.currentTarget.id;
    setTicketId(ticketId);
    setIsLoading(true);

    const ticketsId = ref(db, `tickets/${ticketId}/`);
    onValue(ticketsId, (snapshot) => {
      const data = snapshot.val();
      setFullTicketsInfo(data);
      setIsLoading(false);
      setOpenFullTicketInfo(true);
    });
  }

  function createData(dateTicket, reason, description) {
    return { dateTicket, reason, description };
  }

  function createRows() {
    const tickets = !allTickets ? null : Object.keys(allTickets);
    const rows = [];

    for (let i = 0; i < tickets?.length; i++) {
      rows[i] = createData(
        allTickets[tickets[i]].ticketDate,
        allTickets[tickets[i]].reason,
        <Button id={tickets[i]} onClick={getId} color="secondary">
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

  // удаление обращения
  const adminDeleteTicket = async () => {
    const dbRef = ref(getDatabase());

    try {
      const ticketSnapshot = await get(dbRef, `tickets/${ticketId}`);

      if (ticketSnapshot.exists()) {
        const ticketRefToRemove = child(dbRef, `tickets/${ticketId}`);

        await remove(ticketRefToRemove);
        setOpenFullTicketInfo(false);

        // показать Alert об успешном удалении
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
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
              <TableRow key={row.dateTicket}>
                <TableCell component="th" scope="row">
                  {row.dateTicket}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.reason}
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
        
        {isLoading ? (
          <Preloader />
        ) : (
          <FullTicketsInfo
            openFullTicketInfo={openFullTicketInfo}
            setOpenFullTicketInfo={setOpenFullTicketInfo}
            fullTicketInfo={fullTicketInfo}
            ticketId={ticketId}
            adminDeleteTicket={adminDeleteTicket}
          />
        )}
      </TableContainer>
    </>
  );
}

export default TableTickets;
