import { Alert, Snackbar } from "@mui/material";

const ApplicationSubmitSuccess = ({ openApplicationSubmitSuccess, setOpenApplicationSubmitSuccess }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenApplicationSubmitSuccess(false);
  };
  return (
    <div>
      <Snackbar
        open={openApplicationSubmitSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Обращение успешно отправлено! Ответ будет отправлен на указанный Вами Email.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ApplicationSubmitSuccess;