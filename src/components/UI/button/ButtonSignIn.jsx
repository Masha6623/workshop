import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonLogin: {
    float: "right",
    color: "white",
  },
}));

const ButtonSignIn = ({ setOpenSignIn }) => {
  const classes = useStyles();

  return (
    <Button onClick={() => setOpenSignIn(true)} className={classes.buttonLogin}>
      Войти
    </Button>
  );
};

export default ButtonSignIn;
