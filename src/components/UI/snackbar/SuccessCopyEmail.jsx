import { Alert, Snackbar } from "@mui/material";

const SuccessCopyEmail = ({ openSuccessCopyEmail, setOpenSuccessCopyEmail }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessCopyEmail(false);
  };
  return (
    <div>
      <Snackbar
        open={openSuccessCopyEmail}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Email успешно скопирован!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuccessCopyEmail;