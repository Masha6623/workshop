import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
  Slide,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";

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

const SignIn = ({ setOpenSignIn, openSignIn }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("Подтвердите почту"); ///
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError("Аккаунт не найден!");
      });
  }

  return (
    <>
      <Dialog
        open={openSignIn}
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
        <form key={4}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "15px 0" }}
          >
            Авторизация
          </Typography>
          <DialogContent style={{ width: "250px", textAlign: "center" }}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "10px" }}
              placeholder="Введите email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
              placeholder="Введите пароль"
            />
            {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={logIn}>Войти</Button>
            <Button onClick={() => setOpenSignIn(false)}>Закрыть</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SignIn;
