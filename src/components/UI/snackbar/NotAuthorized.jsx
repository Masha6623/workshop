import { Alert, Snackbar } from "@mui/material";

const NotAuthorized = ({ openNotAuth, setOpenNotAuth }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotAuth(false);
  };
  return (
    <div>
      <Snackbar
        open={openNotAuth}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
        >
            Данный раздел доступен только для авторизованных пользователей!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotAuthorized;