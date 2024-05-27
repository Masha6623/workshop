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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { getDatabase, ref, set } from "firebase/database";

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

const SignUp = ({ setOpenSignUp, openSignUp, setOpenSuccessMessage }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");

  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Пароли не совпадают!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        sendEmailVerification(user).then(() => {
          console.log(userCredential);
          setOpenSuccessMessage(true);
          setError("");
          setEmail("");
          setPassword("");
          setCopyPassword("");
          setOpenSignUp(false);

          const database = getDatabase();
          set(ref(database, `users/${user.uid}`), {
            email: email,
            role: "user",
            userOrders: "",
            phoneNumber: "",
          });
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Dialog
        open={openSignUp}
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
        <form key={4} onSubmit={register}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "15px 0" }}
          >
            Регистрация
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
            <Input
              type="password"
              value={copyPassword}
              onChange={(e) => setCopyPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
              placeholder="Введите пароль еще раз"
            />
          </DialogContent>
          {error && (
            <Typography style={{ color: "red", marginLeft: "30px" }}>
              {error}
            </Typography>
          )}
          <DialogActions>
            <Button type="submit">Зарегистрироваться</Button>
            <Button onClick={() => setOpenSignUp(false)}>Закрыть</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SignUp;
