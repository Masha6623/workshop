import { Alert, Snackbar } from "@mui/material";

const Success = ({ openSuccessMessage, setOpenSuccessMessage }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessage(false);
  };
  return (
    <div>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Письмо с подтверждением отправлено на вашу почту
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Success;
