import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import PhoneNumber from "../phoneNumber/PhoneNumber";
//   import PhoneNumber from "../forms/PhoneNumber";

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

const Login = ({ openLogin, setOpenLogin }) => {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  return (
    <>
      <Dialog
        open={openLogin}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
        }}
        TransitionComponent={Transition}
        className={classes.root}
        aria-labelledby="Авторизация"
      >
        <form key={2}>
          <DialogContent>
            <PhoneNumber form={form} />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => e.preventDefault()} type="submit">
              Отправить код
            </Button>
            <Button onClick={() => setOpenLogin(false)}>Закрыть</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Login;
