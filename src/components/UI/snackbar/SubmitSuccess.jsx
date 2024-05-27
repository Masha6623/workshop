import { Alert, Snackbar } from "@mui/material";

const SubmitSuccess = ({ openSubmitSuccess, setOpenSubmitSuccess }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSubmitSuccess(false);
  };
  return (
    <div>
      <Snackbar
        open={openSubmitSuccess}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Заявка успешно отправлена на рассмотрение. Ее статус можно посмотреть в личном кабинете.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubmitSuccess;